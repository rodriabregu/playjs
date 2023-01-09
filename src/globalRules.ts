// @ts-nocheck
import { parseResultHTML } from './utils';

globalThis.open = 'Desactivated for security reasons' as any;
globalThis.print = 'Desactivated for security reasons' as any;
globalThis.alert = 'Desactivated for security reasons' as any;
globalThis.prompt = 'Desactivated for security reasons' as any;
globalThis.confirm = 'Desactivated for security reasons' as any;

globalThis.console.log = function (...e) {
  return parseResultHTML(...e);
};
