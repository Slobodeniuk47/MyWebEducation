import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;            // путь к видео
  onClose: () => void;    // функция закрытия плеера
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Позиция для контейнера
  const [position, setPosition] = useState({ bottom: 20, right: 20 });
  const dragData = useRef<{ isDragging: boolean; startX: number; startY: number; startBottom: number; startRight: number }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startBottom: 20,
    startRight: 20,
  });

  // Начало перетаскивания
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragData.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startBottom: position.bottom,
      startRight: position.right,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Перемещение мыши
  const onMouseMove = (e: MouseEvent) => {
    if (!dragData.current.isDragging) return;

    const deltaX = e.clientX - dragData.current.startX;
    const deltaY = e.clientY - dragData.current.startY;

    // Обновляем позицию — bottom и right, чтобы контейнер двигался
    let newBottom = dragData.current.startBottom - deltaY;
    let newRight = dragData.current.startRight - deltaX;

    // Не даём уйти за границы экрана (минимум 0)
    newBottom = Math.max(newBottom, 0);
    newRight = Math.max(newRight, 0);

    setPosition({ bottom: newBottom, right: newRight });
  };

  // Окончание перетаскивания
  const onMouseUp = () => {
    dragData.current.isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      style={{
        ...styles.floatingContainer,
        bottom: position.bottom,
        right: position.right,
        cursor: 'default', // курсор всегда стрелка
      }}
      onMouseDown={onMouseDown}
    >
      <button onClick={onClose} style={styles.closeBtn} aria-label="Закрыть видео">
        ✕
      </button>
      <video ref={videoRef} src={src} controls autoPlay style={styles.video} controlsList="nodownload"/>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  floatingContainer: {
    position: 'fixed',
    width: 550,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
    userSelect: 'none', // отключаем выделение текста при перетаскивании
  },
  closeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '50%',
    width: 24,
    height: 24,
    fontSize: 16,
    color: '#fff',
    cursor: 'pointer',
    zIndex: 10,
  },
  video: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: 12,
  },
};

export default VideoPlayer;
