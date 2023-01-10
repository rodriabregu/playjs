// @ts-nocheck
import { parseResultHTML } from './utils';

globalThis.console.log = function (...e) {
  return parseResultHTML(...e);
};

globalThis.open = () => 'Desactivated for security reasons';
globalThis.close = () => 'Desactivated for security reasons';
globalThis.print = () => 'Desactivated for security reasons';
globalThis.alert = () => 'Desactivated for security reasons';
globalThis.prompt = () => 'Desactivated for security reasons';
globalThis.confirm = () => 'Desactivated for security reasons';

globalThis.console.error = console.log;
globalThis.console.info = console.log;
globalThis.console.debug = console.log;
globalThis.console.warn = console.log;
