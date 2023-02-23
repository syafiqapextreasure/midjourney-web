import { z } from "zod";

export const enum CurveFitting {
    Pixel = "pixel",
    Polygon = "polygon",
    Spline = "spline"
}

export const Options = z.object({
    isBW: z.boolean(),
    filterSpeckles: z.number().min(1).max(16),
    isCutOut: z.boolean(),
    colorPrecision: z.number().min(1).max(8),
    gradientSteps: z.number().min(0).max(256),
    curveFitting: z.enum([CurveFitting.Pixel, CurveFitting.Polygon, CurveFitting.Spline]),
    cornerThreshold: z.number().min(0).max(180),
    segmentLength: z.number().min(3.5).max(10),
    spliceThreshold: z.number().min(0).max(180),
})

export type OptionsType = z.infer<typeof Options>;

export const OptionsDefault: OptionsType = {
    isBW: false,
    filterSpeckles: 4,
    isCutOut: false,
    colorPrecision: 6,
    gradientSteps: 16,
    curveFitting: CurveFitting.Spline,
    cornerThreshold: 60,
    segmentLength: 4,
    spliceThreshold: 45,
}