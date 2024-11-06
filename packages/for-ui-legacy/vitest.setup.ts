import { expect } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
