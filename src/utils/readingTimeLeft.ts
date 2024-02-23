import { OwnBooksParams } from './definitions';

export function calculateRemainingReadingTime(
    selectBook: OwnBooksParams,
): string {
    let totalReadPages = 0;
    let totalTimeSpentMinutes = 0;

    selectBook.progress.forEach(session => {
        const pagesRead = session.finishPage - session.startPage;
        totalReadPages += pagesRead;

        const startTime = new Date(session.startReading);
        const finishTime = new Date(session.finishReading);
        const timeSpent = (finishTime.getTime() - startTime.getTime()) / 60000;
        totalTimeSpentMinutes += timeSpent;
    });

    const averageSpeed = totalReadPages / totalTimeSpentMinutes;

    const pagesLeft = selectBook.totalPages - totalReadPages;

    const remainingTime = pagesLeft / averageSpeed;
    const hoursLeft = Math.floor(remainingTime / 60);
    const minutesLeft = Math.round(remainingTime % 60);

    return `${hoursLeft} hours and ${minutesLeft} minutes left`;
}
