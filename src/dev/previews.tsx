import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Category from "../containers/category/Category.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Category">
                <Category/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;