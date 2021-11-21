import { useState } from "react";
import { Button } from "@mui/material";
import { FusionData, SkillDemonMap } from "../utils/types";
import { FusionRecipeSkillFinder } from "./FusionRecipeSkillFinder";
import { FusionRecipeComponentFinder } from "./FusionRecipeComponentFinder";
import { NavBar } from "../NavBar";
import "./FusionRecipe.css";

enum CalculationType {
  SKILLS,
  COMPONENTS,
}

interface FusionRecipeProps {
  fusionData: FusionData;
  skillList: SkillDemonMap[];
}

function buttonOutlineType(
  buttonCalculationType: CalculationType,
  curCalculationType: CalculationType
) {
  return buttonCalculationType === curCalculationType ? "outlined" : "text";
}

export function FusionRecipe(props: FusionRecipeProps) {
  let [calculationType, setCalculationType] = useState(CalculationType.SKILLS);

  return (
    <div>
      <NavBar />
      <div className="recipeFinderContainer">
        <Button
          className="toggleRecipeType"
          variant={buttonOutlineType(CalculationType.SKILLS, calculationType)}
          onClick={(e) => setCalculationType(CalculationType.SKILLS)}
        >
          Skills
        </Button>
        <Button
          className="toggleRecipeType"
          variant={buttonOutlineType(
            CalculationType.COMPONENTS,
            calculationType
          )}
          onClick={(e) => setCalculationType(CalculationType.COMPONENTS)}
        >
          Components
        </Button>
        <div className="recipeFinder">
          {calculationType === CalculationType.SKILLS && (
            <FusionRecipeSkillFinder
              fusionData={props.fusionData}
              skillList={props.skillList}
            />
          )}
          {calculationType === CalculationType.COMPONENTS && (
            <FusionRecipeComponentFinder fusionData={props.fusionData} />
          )}
        </div>
      </div>
    </div>
  );
}
