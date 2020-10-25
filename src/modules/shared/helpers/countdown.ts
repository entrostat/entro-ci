import { sleep } from './sleep';

export async function countdown(
    seconds: number,
    messageGenerator: (secondsLeft: number) => string,
    output: (message: string) => void,
) {
    for (let i = 0; i < seconds; i++) {
        const secondsLeft = Math.max(seconds - i, 0);
        const message = messageGenerator(secondsLeft);
        output(message);
        await sleep(1000);
    }
}
