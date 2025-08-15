import { useParams } from 'react-router';
import CanvasTitle from '../componenets/CanvasTitle';
import LeanCanvas from '../componenets/LeanCanvas';
import { useEffect, useState } from 'react';
import { getCanvasById, updateCanvas, updateTitle } from '../api/canvas';

function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    async function fetchCanvas() {
      const data = await getCanvasById(id);
      setCanvas(data);
    }
    fetchCanvas();
  }, [id]);
  async function handleTitleChange(title) {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  }
  async function handleCanvasChange(updatedCanvas) {
    try {
      await updateCanvas(id, updatedCanvas);
      setCanvas(updatedCanvas);
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <div>
      <CanvasTitle onChange={handleTitleChange} value={canvas?.title} />
      {canvas && (
        <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />
      )}
    </div>
  );
}

export default CanvasDetail;
