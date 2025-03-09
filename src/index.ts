import { Brush } from "./core/Brush";

// Export for ES modules
export { Brush as default };

// Export for UMD/CommonJS
if (typeof window !== 'undefined') {
    (window as any).Brush = Brush;
}