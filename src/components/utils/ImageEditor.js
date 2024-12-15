// ImageEditor.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoAdd, IoRemove, IoCheckmark, IoClose } from 'react-icons/io5';

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
`;

const Canvas = styled.canvas`
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 100%;
    max-height: 400px;
`;

const Controls = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const Button = styled.button`
    background: #128c7e;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
    
    &:hover {
        background: #075e54;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

const Slider = styled.input`
    width: 200px;
`;

const ImageEditor = ({ imageSrc, onApply, onCancel }) => {
    const canvasRef = useRef(null);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width * zoom;
            canvas.height = img.height * zoom;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }, [imageSrc, zoom]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.1, 3)); // حداکثر زوم ۳ برابر
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.1, 0.5)); // حداقل زوم ۰.۵ برابر
    };

    const handleApply = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        onApply(dataURL);
    };

    return (
        <EditorContainer>
            <h3>Image Editor</h3>
            <Canvas ref={canvasRef} />
            <Controls>
                <Button onClick={handleZoomOut} disabled={zoom <= 0.5}>
                    <IoRemove /> Zoom Out
                </Button>
                <Slider
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
                <Button onClick={handleZoomIn} disabled={zoom >= 3}>
                    <IoAdd /> Zoom In
                </Button>
            </Controls>
            <Controls>
                <Button onClick={handleApply}>
                    <IoCheckmark /> Apply
                </Button>
                <Button onClick={onCancel} style={{ background: '#c53030' }}>
                    <IoClose /> Cancel
                </Button>
            </Controls>
        </EditorContainer>
    );
};

export default ImageEditor;
