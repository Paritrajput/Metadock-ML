import { useEffect, useRef } from "react";
import * as NGL from "ngl";
import { useTheme } from "../../context/ThemeContext";


export default function MoleculeViewer({
  pdbUrl,
  ligand,
  representation,
}) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const proteinRef = useRef(null);
  const ligandRef = useRef(null);
  const { theme } = useTheme();


  useEffect(() => {
    // stageRef.current = new NGL.Stage(containerRef.current, {
    //   backgroundColor: "white",
    // });
    stageRef.current = new NGL.Stage(containerRef.current, {
  backgroundColor: theme === "dark" ? "black" : "white",
});




    window.addEventListener("resize", stageRef.current.handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        stageRef.current.handleResize
      );
      stageRef.current.dispose();
    };
  }, []);


  // Load protein
  useEffect(() => {
    if (!stageRef.current || !pdbUrl) return;

    stageRef.current.removeAllComponents();

    stageRef.current.loadFile(pdbUrl).then((protein) => {
      proteinRef.current = protein;
      applyProteinRepresentation(protein, representation);
    });
  }, [pdbUrl]);

  // Update representation
  useEffect(() => {
    if (proteinRef.current) {
      applyProteinRepresentation(
        proteinRef.current,
        representation
      );
    }
  }, [representation]);

  // Load ligand + pocket
  useEffect(() => {
    if (!ligand || !proteinRef.current) return;

    // Remove old ligand
    if (ligandRef.current) {
      stageRef.current.removeComponent(ligandRef.current);
    }

    stageRef.current.loadFile(ligand.ligandUrl).then((lig) => {
      ligandRef.current = lig;

      lig.addRepresentation("ball+stick", {
        color: "element",
        scale: 2,
      });

      // Highlight binding pocket
      proteinRef.current.addRepresentation("ball+stick", {
        sele: ligand.pocketResidues
          .split(",")
          .map(r => `:${r}`)
          .join(" OR "),
        color: "red",
      });

      proteinRef.current.autoView(200);
    });
  }, [ligand]);

  function applyProteinRepresentation(component, type) {
    component.removeAllRepresentations();

    if (type === "cartoon") {
      component.addRepresentation("cartoon", {
        color: "chainid",
      });
    }

if (type === "surface") {
  component.addRepresentation("surface", {
    opacity: 0.25,
    color: "chainid",
  });

  // Highlight pocket if ligand exists
  if (ligand?.pocketResidues) {
    component.addRepresentation("ball+stick", {
      sele: ligand.pocketResidues
        .split(",")
        .map(r => `:${r}`)
        .join(" OR "),
      color: "red",
    });
  }
}

    if (type === "sticks") {
      component.addRepresentation("ball+stick");
    }

    component.autoView(200);
  }
        useEffect(() => {
  if (stageRef.current) {
    stageRef.current.setParameters({
      backgroundColor: theme === "dark" ? "black" : "white",
    });
  }
}, [theme]);

  return (
 <div
  ref={containerRef}
  className="w-full h-full rounded border bg-gray-100"
 />

  );
}
