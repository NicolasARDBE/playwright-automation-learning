import { errors } from '@playwright/test';
import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';

class MyReporter implements Reporter {

    onBegin(config: FullConfig, suite: Suite): void {
        console.log(`Execution of ${suite.allTests().length} tests`);
    }

    onEnd(result: FullResult): Promise<{ status?: FullResult['status']; } | undefined | void> | void {
        console.log(`Execution finished with ${result.status}`);
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const execTime = result.duration;
        const data = {
            testName: test.title,
            status: result.status,
            execTime: execTime,
            errors: result.errors
        };
        console.log(`Finished test ${test.title} with status: ${result.status}`);
        const dataToString = JSON.stringify(data, null, 2);
        console.log(dataToString);
        fs.writeFileSync('test-report.json', dataToString);
    }
}

export default MyReporter;