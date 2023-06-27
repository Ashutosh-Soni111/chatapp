import { useEffect, useRef } from "react";

export const useCircleArrangement = ( circleRef: HTMLDivElement, beadSize: string, wristSize: string ) => 
{
    const isFirstRender = useRef(true);
    const itemCount: number = eval(beadSize); // Number of items
    const radius: number = eval(wristSize); // Radius of the circle
    const centerRef = useRef({ x: 0, y: 0 }); // Center coordinates of the circle
    const items = [];

    useEffect(() => {
        if (isFirstRender.current) {
            const itemElement = circleRef;
            console.log("helle it's circleArrangement", itemElement, centerRef.current);
            // if(itemElement){
            //     const { left, top, width, height } =
            //         itemElement.getBoundingClientRect();
            //     centerRef.current = { x: left + width / 2, y: top + height / 2 };
            //     console.log("helelo")
            //     console.log(left, top, width, height);
            // } 
            isFirstRender.current = false;
        }
      }, []);
      
    console.log("center: ",centerRef.current)
    if (centerRef.current) {
        for (let i = 0; i < itemCount; i++) {
            const angle = (i * 360) / itemCount; // Calculate the angle for each item
            const radians = (angle * Math.PI) / 180; // Convert angle to radians

            // Calculate the position of each item
            const x = centerRef.current.x + radius * Math.cos(radians);
            const y = centerRef.current.y + radius * Math.sin(radians);
            items.push({ x, y });
        }
    } else console.error("Error occurred: center is missing ");
    return items;
};
