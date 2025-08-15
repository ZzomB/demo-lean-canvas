import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
//목록 조회
export async function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
}

//저장
export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}

//delete
export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
}

//특정 캔버스 정보 가져오기
export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}
//제목 수정
export async function updateTitle(id, title) {
  // post- 새로운 자원 생성
  // put - 기존 자원 전체 업데이트 및 새 자원 생성
  // put - 일부수정
  await canvases.patch(`/${id}`, { title });
}
//수정
export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}
