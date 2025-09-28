import { useEffect, useRef } from "react";

type DragType = {
    data: string;
    gridSpacing: number;
    initLeft: number | undefined;
    maxTimelineWidth: number;
    onPositionUpdate?: (newPosition: number) => void;
};

export function useDraggable(
    ref: React.RefObject<HTMLDivElement | null>,
    { ...dragType }: DragType
) {
    const { data, gridSpacing, initLeft, maxTimelineWidth, onPositionUpdate } =
        dragType;

    const startX = useRef(0);
    const currentLeft = useRef(initLeft);
    const isDragging = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (initLeft === undefined) return;

        // Initial styles
        node.style.position = "absolute";
        node.style.left = `${initLeft}px`;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            startX.current = e.clientX;
            currentLeft.current = node.offsetLeft;
            node.style.cursor = "grab";
            e.preventDefault();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            if (currentLeft.current === undefined) return;

            const deltaX = e.clientX - startX.current;
            const newLeft = currentLeft.current + deltaX;

            if (newLeft > 0 && newLeft < maxTimelineWidth - gridSpacing) {
                const snappedLeft =
                    Math.round(newLeft / gridSpacing) * gridSpacing;
                node.style.left = `${snappedLeft}px`;

                if (onPositionUpdate) {
                    onPositionUpdate(snappedLeft);
                }
            }
        };

        const handleMouseUp = () => {
            if (!isDragging.current) return;
            node.style.cursor = "default";
            isDragging.current = false;

            currentLeft.current = parseInt(
                node.style.left.replace("px", ""),
                10
            );
            if (onPositionUpdate) {
                onPositionUpdate(currentLeft.current);
            }
        };

        node.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        // Cleanup
        return () => {
            node.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [ref, data, gridSpacing, initLeft, maxTimelineWidth, onPositionUpdate]);
}
