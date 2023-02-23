import { useCallback, useState } from "react";
import { api } from "../utils/api";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, Slider, ToggleButton, Typography } from "@mui/material";
import { OptionsType, OptionsDefault, CurveFitting } from "../server/api/routers/d";
import { Loading } from "./loading";

const ConvertCustomizer = (props: {setOptions: Function}) => {
    const [isBW, setBW] = useState(false);
    const [isCutOut, setCutOut] = useState(false);
    const [filterSpeckles, setFilterSpeckles] = useState(4);
    const [colorPrecision, setColorPrecision] = useState(6);
    const [gradientSteps, setGradientSteps] = useState(16);
    const [curveFitting, setCurveFitting] = useState(CurveFitting.Spline);
    const [cornerThreshold, setCornerThreshold] = useState(60);
    const [segmentLength, setSegmentLength] = useState(4);
    const [spliceThreshold, setSpliceThreshold] = useState(45);

    const handleOptions = useCallback(() => {
        const options: OptionsType = { isBW, isCutOut, filterSpeckles, colorPrecision, gradientSteps, cornerThreshold, segmentLength, spliceThreshold, curveFitting };
        props.setOptions(options);
    }, [isBW, isCutOut, filterSpeckles, colorPrecision, gradientSteps, curveFitting, cornerThreshold, segmentLength, spliceThreshold]);
    
    console.log({
        isBW,
        isCutOut,
        filterSpeckles,
    })

    const colorOptions = (
        <>
        <ToggleButtonGroup key="cutout" exclusive>
            <ToggleButton value={0} selected={isCutOut} onClick={() => setCutOut(true)}>CUTOUT</ToggleButton>
            <ToggleButton value={0} selected={!isCutOut} onClick={() => setCutOut(false)}>STAKED</ToggleButton>
        </ToggleButtonGroup>
        <br></br>
        <br></br>
        <Typography gutterBottom>Color Precision (More accurate)</Typography>
        <Slider 
            value={colorPrecision}
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => setColorPrecision(newValue as number)} 
            step={1}
            min={1}
            max={8}
        ></Slider>
        <br></br>
        <br></br>
        <Typography gutterBottom>Gradient Step (Less layers)</Typography>
        <Slider 
            value={gradientSteps}
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => setGradientSteps(newValue as number)} 
            step={1}
            min={0}
            max={128}
        ></Slider>
        </>
    )

    const splineOptions = (
        <>
        <br></br>
        <Typography gutterBottom>Corner Threshold (Smoother)</Typography>
        <Slider 
            value={cornerThreshold}
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => setCornerThreshold(newValue as number)} 
            step={1}
            min={0}
            max={180}
        ></Slider>
        <br></br>
        <br></br>
        <Typography gutterBottom>Segment Length (More coarse)</Typography>
        <Slider 
            value={segmentLength}
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => setSegmentLength(newValue as number)} 
            step={0.5}
            min={3.5}
            max={10}
        ></Slider>
        <br></br>
        <br></br>
        <Typography gutterBottom>Splice Threshold (Less accurate)</Typography>
        <Slider 
            value={spliceThreshold}
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => setSpliceThreshold(newValue as number)} 
            step={1}
            min={0}
            max={180}
        ></Slider>
        </>
    )
    
    return (
        <>
        <ToggleButtonGroup key="bw" exclusive>
            <ToggleButton value={0} selected={isBW} onClick={() => setBW(true)}>B/W</ToggleButton>
            <ToggleButton value={0} selected={!isBW} onClick={() => setBW(false)}>COLOR</ToggleButton>
        </ToggleButtonGroup>
        <br></br>
        {!isBW? colorOptions : <></>}
        <br></br>
        <br></br>
        <Typography gutterBottom>Filter Speckle (Cleaner)</Typography>
        <Slider 
            value={filterSpeckles}
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => setFilterSpeckles(newValue as number)} 
            step={1}
            min={1}
            max={16}
        ></Slider>
        <br></br>
        <br></br>
        <ToggleButtonGroup key="curveFitting" exclusive>
            <ToggleButton value={0} selected={curveFitting===CurveFitting.Pixel} onClick={() => setCurveFitting(CurveFitting.Pixel)}>PIXEL</ToggleButton>
            <ToggleButton value={0} selected={curveFitting===CurveFitting.Polygon} onClick={() => setCurveFitting(CurveFitting.Polygon)}>POLYGON</ToggleButton>
            <ToggleButton value={0} selected={curveFitting===CurveFitting.Spline} onClick={() => setCurveFitting(CurveFitting.Spline)}>SPLINE</ToggleButton>
        </ToggleButtonGroup>
        <br></br>
        {curveFitting === CurveFitting.Spline? splineOptions : <></>}
        <Button variant="outlined" onClick={handleOptions}>Regenerate</Button>
        </>
    )
};

const SvgViewer = (props: { data: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: props.data }}></div >;
}

export const SvgConverter = (props: { url: string }) => {
    const [options, setOptions] = useState(OptionsDefault);

    const svg = api.example.convert.useQuery({
        url: props.url,
        ...options
    }, { refetchOnWindowFocus: false });

    if (props.url === "") return <div></div>;

    const isLoading = !svg.data;

    return (
        <div className="grid-container">
            <div className="grid-item">
                {isLoading? <Loading></Loading>:(
                    <>
                    <SvgViewer data={svg.data}></SvgViewer>
                    <Button variant="outlined" onClick={() => {
                        const a = document.createElement("a");
                        a.href = `data:image/svg+xml,${encodeURIComponent(svg.data)}`;
                        a.download = "download.svg";
                        a.click();
                        a.remove();
                    }}
                    >Download</Button>
                    </>
                )}
            </div>
            <div className="grid-item">
                <ConvertCustomizer setOptions={setOptions}></ConvertCustomizer>
            </div>
        </div>
    )
}