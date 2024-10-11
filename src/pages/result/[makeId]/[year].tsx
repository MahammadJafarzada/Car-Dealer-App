import { GetStaticPaths, GetStaticProps } from 'next';
import { Suspense } from 'react';

interface Model {
  Model_ID: number;
  Model_Name: string;
}

interface Props {
  makeId: string;
  year: string;
  models: Model[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', 
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { makeId, year } = context.params as { makeId: string; year: string };

  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await res.json();

    return {
      props: {
        makeId,
        year,
        models: data.Results || [],
      },
      revalidate: 3600, 
    };
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return {
      notFound: true,
    };
  }
};

export default function Result({ makeId, year, models }: Props) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Vehicle Models for Make ID: {makeId}, Year: {year}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        {models.length > 0 ? (
          <ul className="list-disc pl-5">
            {models.map((model) => (
              <li key={model.Model_ID}>{model.Model_Name}</li>
            ))}
          </ul>
        ) : (
          <p>No models found for this make and year.</p>
        )}
      </Suspense>
    </div>
  );
}
