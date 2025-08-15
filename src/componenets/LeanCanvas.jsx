import { FaPlus } from 'react-icons/fa';
import CanvasCard from './CanvasCard';
function LeanCanvas({ onCanvasChange, canvas }) {
  function handleNotesChange(section, updatedNotes) {
    const updatedCanvas = {
      ...canvas,
      [section]: { ...canvas[section], notes: updatedNotes },
    };
    onCanvasChange(updatedCanvas);
  }
  return (
    <div className="border-4 border-black">
      <div className="grid grid-cols-5">
        <CanvasCard
          title={'1. 문제'}
          notes={canvas.problem?.notes}
          onNotesChange={notes => handleNotesChange('problem', notes)}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('solution', notes)}
          title={'4. 해결안'}
          notes={canvas.solution?.notes}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('valueProposition', notes)}
          title={'3. 가치제안'}
          notes={canvas.valueProposition?.notes}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('unfairAdvantage', notes)}
          title={'5. 경쟁우위'}
          notes={canvas.unfairAdvantage?.notes}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('customerSegments', notes)}
          title={'2. 목표 고객'}
          notes={canvas.customerSegments?.notes}
        />
        <CanvasCard
          onNotesChange={notes =>
            handleNotesChange('existingAlternatives', notes)
          }
          title={'기존 대안'}
          isSubtitle
          notes={canvas.existingAlternatives?.notes}
        />

        <CanvasCard
          onNotesChange={notes => handleNotesChange('keyMetrics', notes)}
          title={'8.핵심지표'}
          notes={canvas.keyMetrics?.notes}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('highLevelConcept', notes)}
          title={'상위개념'}
          isSubtitle
          notes={canvas.highLevelConcept?.notes}
        />

        <CanvasCard
          onNotesChange={notes => handleNotesChange('channels', notes)}
          title={'9. 고객 경로'}
          notes={canvas.channels?.notes}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('earlyAdopters', notes)}
          title={'얼리 어답터'}
          isSubtitle
          notes={canvas.earlyAdopters?.notes}
        />
      </div>
      <div className="grid grid-cols-2">
        <CanvasCard
          onNotesChange={notes => handleNotesChange('costStructure', notes)}
          title={'7. 비용 구조'}
          notes={canvas.costStructure?.notes}
        />
        <CanvasCard
          onNotesChange={notes => handleNotesChange('revenueStreams', notes)}
          title={'6. 수익 흐름'}
          notes={canvas.revenueStreams?.notes}
        />
      </div>
    </div>
  );
}

export default LeanCanvas;
