import { Dashboard } from '@/components/Dashboard/Dashboard';
import { getRecommendedBooks } from '@/services/api';

const recommendedPage = async () => {
  const recommendedBooks = await getRecommendedBooks({});
  console.log(`recommendedBooks:`, recommendedBooks);

  return (
    <main>
      <section>
        <Dashboard>
          <div></div>
        </Dashboard>
      </section>
    </main>
  );
};

export default recommendedPage;
