/* eslint-env jest */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line no-console
const consoleError = console.error;

function logToError(error) {
    throw new Error(error);
}

beforeEach(() => {
    // eslint-disable-next-line no-console
    console.error = logToError;
});

afterEach(() => {
    // eslint-disable-next-line no-console
    console.error = consoleError;
});
