// Little Artist's Drawing Room - Interactive Canvas Studio
// Supports mouse and touch drawing, rainbow & sparkle brushes, cute stamps, undo/redo, and PNG export!

class DrawingRoom {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.points = [];

    // Tool state
    this.tool = 'brush'; // 'brush', 'sparkle', 'rainbow', 'neon', 'eraser', 'stamp'
    this.color = '#ff66aa';
    this.brushSize = 10;
    this.activeStamp = '🦄';
    this.rainbowHue = 0;

    // History stack for Undo/Redo
    this.history = [];
    this.historyStep = -1;
    this.maxHistory = 20;

    // Background template
    this.activeTemplate = 'blank'; // blank, castle, unicorn, teddy
  }

  init() {
    this.canvas = document.getElementById('drawingCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.handleResize());

    this.setupPointerEvents();
    this.setupControls();
    this.clearCanvas(false);
  }

  handleResize() {
    // Preserve current drawing on resize
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(this.canvas, 0, 0);

    this.resizeCanvas();
    this.ctx.drawImage(tempCanvas, 0, 0, this.canvas.width, this.canvas.height);
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    const parentWidth = parent ? parent.clientWidth : 320;
    const rectWidth = parentWidth > 50 ? parentWidth : (window.innerWidth - 32);

    const isMobile = window.innerWidth <= 640;
    const isTinyPhone = window.innerWidth <= 380;

    const displayWidth = Math.max(260, Math.min(rectWidth, 820));
    // Proportional mobile height so canvas fits comfortably above controls
    let displayHeight;
    if (isTinyPhone) {
      displayHeight = 240;
    } else if (isMobile) {
      displayHeight = Math.min(300, Math.floor(displayWidth * 0.78));
    } else {
      displayHeight = Math.max(360, Math.min(window.innerHeight * 0.52, 500));
    }

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(displayWidth * dpr);
    this.canvas.height = Math.floor(displayHeight * dpr);

    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;

    this.ctx.scale(dpr, dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  setupPointerEvents() {
    // Pointer events unify mouse, touch, and stylus
    this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointerleave', (e) => this.onPointerUp(e));
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  onPointerDown(e) {
    e.preventDefault();
    this.canvas.setPointerCapture(e.pointerId);
    const pos = this.getPointerPos(e);

    if (this.tool === 'stamp') {
      this.placeStamp(pos.x, pos.y);
      this.saveHistoryState();
      return;
    }

    this.isDrawing = true;
    this.lastX = pos.x;
    this.lastY = pos.y;
    this.points = [pos];

    if (window.soundEngine) {
      if (this.tool === 'eraser') {
        window.soundEngine.playBrush();
      } else if (this.tool === 'sparkle') {
        window.soundEngine.playSparkle();
      } else {
        window.soundEngine.playBrush();
      }
    }

    this.drawPoint(pos.x, pos.y);
  }

  onPointerMove(e) {
    if (!this.isDrawing) return;
    e.preventDefault();
    const pos = this.getPointerPos(e);
    this.points.push(pos);

    if (this.tool === 'brush') {
      this.drawSmoothStroke(pos);
    } else if (this.tool === 'sparkle') {
      this.drawSparkleStroke(pos);
    } else if (this.tool === 'rainbow') {
      this.drawRainbowStroke(pos);
    } else if (this.tool === 'neon') {
      this.drawNeonStroke(pos);
    } else if (this.tool === 'eraser') {
      this.drawEraserStroke(pos);
    }

    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  onPointerUp(e) {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.points = [];
      this.saveHistoryState();
    }
  }

  // Draw initial dot for clicks without move
  drawPoint(x, y) {
    this.ctx.save();
    if (this.tool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.brushSize, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      this.ctx.fillStyle = this.getStrokeColor();
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
      this.ctx.fill();

      if (this.tool === 'sparkle') {
        this.emitSparkles(x, y);
      }
    }
    this.ctx.restore();
  }

  getStrokeColor() {
    if (this.tool === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 4) % 360;
      return `hsl(${this.rainbowHue}, 85%, 65%)`;
    }
    return this.color;
  }

  drawSmoothStroke(pos) {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawEraserStroke(pos) {
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineWidth = this.brushSize * 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawRainbowStroke(pos) {
    this.ctx.save();
    this.rainbowHue = (this.rainbowHue + 3) % 360;
    this.ctx.strokeStyle = `hsl(${this.rainbowHue}, 85%, 62%)`;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawNeonStroke(pos) {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.shadowColor = this.color;
    this.ctx.shadowBlur = 15;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawSparkleStroke(pos) {
    this.drawSmoothStroke(pos);
    if (Math.random() > 0.4) {
      this.emitSparkles(pos.x, pos.y);
    }
  }

  emitSparkles(x, y) {
    const count = 2 + Math.floor(Math.random() * 3);
    const starSymbols = ['✨', '⭐', '💖', '🌸'];

    this.ctx.save();
    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * (this.brushSize * 3);
      const offsetY = (Math.random() - 0.5) * (this.brushSize * 3);
      const star = starSymbols[Math.floor(Math.random() * starSymbols.length)];
      const size = 12 + Math.random() * 10;

      this.ctx.font = `${size}px sans-serif`;
      this.ctx.fillText(star, x + offsetX - size / 2, y + offsetY + size / 2);
    }
    this.ctx.restore();
  }

  placeStamp(x, y) {
    this.ctx.save();
    const stampSize = this.brushSize * 2.8;
    this.ctx.font = `${stampSize}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.activeStamp, x, y);
    this.ctx.restore();

    if (window.soundEngine) window.soundEngine.playPop();
  }

  // Set tools
  setTool(tool) {
    this.tool = tool;
    document.querySelectorAll('.draw-tool-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === tool);
    });
    if (window.soundEngine) window.soundEngine.playPop();
  }

  setColor(color) {
    this.color = color;
    if (this.tool === 'eraser') {
      this.setTool('brush');
    }
    document.querySelectorAll('.draw-color-swatch').forEach(sw => {
      sw.classList.toggle('selected', sw.dataset.color === color);
    });
    if (window.soundEngine) window.soundEngine.playPop();
  }

  setBrushSize(size) {
    this.brushSize = parseInt(size, 10);
    const indicator = document.getElementById('brushSizeValue');
    if (indicator) indicator.textContent = `${this.brushSize}px`;
    document.querySelectorAll('.size-preset-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.size, 10) === this.brushSize);
    });
  }

  setStamp(stamp) {
    this.activeStamp = stamp;
    this.setTool('stamp');
    document.querySelectorAll('.stamp-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.stamp === stamp);
    });
  }

  // Undo / Redo Stack
  saveHistoryState() {
    // Truncate redo states
    if (this.historyStep < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyStep + 1);
    }

    const dpr = window.devicePixelRatio || 1;
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.history.push(imageData);

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.historyStep++;
    }

    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      this.ctx.putImageData(this.history[this.historyStep], 0, 0);
      if (window.soundEngine) window.soundEngine.playPop();
      this.updateUndoRedoButtons();
    }
  }

  redo() {
    if (this.historyStep < this.history.length - 1) {
      this.historyStep++;
      this.ctx.putImageData(this.history[this.historyStep], 0, 0);
      if (window.soundEngine) window.soundEngine.playPop();
      this.updateUndoRedoButtons();
    }
  }

  updateUndoRedoButtons() {
    const undoBtn = document.getElementById('drawUndoBtn');
    const redoBtn = document.getElementById('drawRedoBtn');
    if (undoBtn) undoBtn.disabled = this.historyStep <= 0;
    if (redoBtn) redoBtn.disabled = this.historyStep >= this.history.length - 1;
  }

  clearCanvas(saveState = true) {
    const dpr = window.devicePixelRatio || 1;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Reapply template if selected
    if (this.activeTemplate !== 'blank') {
      this.drawTemplate(this.activeTemplate);
    }

    if (saveState) {
      if (window.soundEngine) window.soundEngine.playBrush();
      this.saveHistoryState();
    } else {
      this.history = [];
      this.historyStep = -1;
      this.saveHistoryState();
    }
  }

  setTemplate(templateName) {
    this.activeTemplate = templateName;
    document.querySelectorAll('.template-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.template === templateName);
    });
    this.clearCanvas(true);
    if (window.soundEngine) window.soundEngine.playSparkle();
  }

  drawTemplate(name) {
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.save();
    this.ctx.strokeStyle = '#e0c3fc';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const cx = w / 2;
    const cy = h / 2;

    if (name === 'unicorn') {
      // Cute Unicorn Outline
      this.ctx.beginPath();
      // Head
      this.ctx.ellipse(cx, cy - 20, 50, 60, 0, 0, Math.PI * 2);
      // Snout
      this.ctx.ellipse(cx - 35, cy, 25, 20, 0, 0, Math.PI * 2);
      // Horn
      this.ctx.moveTo(cx - 10, cy - 70);
      this.ctx.lineTo(cx + 20, cy - 130);
      this.ctx.lineTo(cx + 25, cy - 65);
      // Eye
      this.ctx.moveTo(cx - 5, cy - 20);
      this.ctx.arc(cx - 15, cy - 20, 8, 0, Math.PI);
      // Ears
      this.ctx.moveTo(cx + 25, cy - 65);
      this.ctx.lineTo(cx + 45, cy - 100);
      this.ctx.lineTo(cx + 50, cy - 55);
      this.ctx.stroke();

      // Horn spiral lines
      this.ctx.beginPath();
      this.ctx.moveTo(cx - 3, cy - 85);
      this.ctx.lineTo(cx + 22, cy - 80);
      this.ctx.moveTo(cx + 5, cy - 105);
      this.ctx.lineTo(cx + 21, cy - 102);
      this.ctx.stroke();

    } else if (name === 'castle') {
      // Dream Castle Outline
      this.ctx.beginPath();
      // Base walls
      this.ctx.rect(cx - 90, cy - 30, 180, 100);
      // Door
      this.ctx.arc(cx, cy + 70, 25, Math.PI, 0);
      this.ctx.lineTo(cx + 25, cy + 70);
      // Central Tower
      this.ctx.rect(cx - 35, cy - 100, 70, 70);
      this.ctx.moveTo(cx - 40, cy - 100);
      this.ctx.lineTo(cx, cy - 150);
      this.ctx.lineTo(cx + 40, cy - 100);
      // Left Turret
      this.ctx.rect(cx - 95, cy - 75, 40, 45);
      this.ctx.moveTo(cx - 100, cy - 75);
      this.ctx.lineTo(cx - 75, cy - 120);
      this.ctx.lineTo(cx - 50, cy - 75);
      // Right Turret
      this.ctx.rect(cx + 55, cy - 75, 40, 45);
      this.ctx.moveTo(cx + 50, cy - 75);
      this.ctx.lineTo(cx + 75, cy - 120);
      this.ctx.lineTo(cx + 100, cy - 75);
      this.ctx.stroke();

    } else if (name === 'teddy') {
      // Fluffy Teddy Bear Outline
      this.ctx.beginPath();
      // Head
      this.ctx.arc(cx, cy - 40, 55, 0, Math.PI * 2);
      // Ears
      this.ctx.arc(cx - 45, cy - 85, 20, 0, Math.PI * 2);
      this.ctx.moveTo(cx + 65, cy - 85);
      this.ctx.arc(cx + 45, cy - 85, 20, 0, Math.PI * 2);
      // Snout
      this.ctx.moveTo(cx + 22, cy - 25);
      this.ctx.ellipse(cx, cy - 25, 22, 16, 0, 0, Math.PI * 2);
      // Body
      this.ctx.moveTo(cx + 65, cy + 50);
      this.ctx.ellipse(cx, cy + 55, 65, 55, 0, 0, Math.PI * 2);
      // Heart on tummy
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(cx - 12, cy + 50, 10, Math.PI, 0, false);
      this.ctx.arc(cx + 12, cy + 50, 10, Math.PI, 0, false);
      this.ctx.lineTo(cx, cy + 70);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  // Save Artwork as PNG
  saveArtwork() {
    if (window.soundEngine) {
      window.soundEngine.playFanfare();
    }

    // Create high-res composite export canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1200;
    exportCanvas.height = 900;
    const expCtx = exportCanvas.getContext('2d');

    // 1. Dreamy Pastel Wallpaper Background
    const bgGrad = expCtx.createLinearGradient(0, 0, 1200, 900);
    bgGrad.addColorStop(0, '#fff5fb');
    bgGrad.addColorStop(0.5, '#f7efff');
    bgGrad.addColorStop(1, '#eef6ff');
    expCtx.fillStyle = bgGrad;
    expCtx.fillRect(0, 0, 1200, 900);

    // Decorative polka dots
    expCtx.fillStyle = 'rgba(255, 143, 199, 0.12)';
    for (let x = 30; x < 1200; x += 60) {
      for (let y = 30; y < 900; y += 60) {
        expCtx.beginPath();
        expCtx.arc(x, y, 4, 0, Math.PI * 2);
        expCtx.fill();
      }
    }

    // 2. Ornate Border Frame
    expCtx.strokeStyle = '#ffb3d9';
    expCtx.lineWidth = 14;
    expCtx.strokeRect(30, 30, 1140, 840);

    expCtx.strokeStyle = '#c499f6';
    expCtx.lineWidth = 4;
    expCtx.strokeRect(48, 48, 1104, 804);

    // Corner rosettes
    const corners = [
      [48, 48],
      [1152, 48],
      [48, 852],
      [1152, 852]
    ];
    expCtx.fillStyle = '#ff8fc7';
    corners.forEach(([cx, cy]) => {
      expCtx.beginPath();
      expCtx.arc(cx, cy, 14, 0, Math.PI * 2);
      expCtx.fill();
    });

    // 3. Draw user drawing
    // Canvas dimensions within frame: 1040 x 680
    expCtx.drawImage(this.canvas, 80, 80, 1040, 680);

    // 4. Header & Signature
    expCtx.fillStyle = '#d977b1';
    expCtx.font = 'bold 30px "Baloo 2", cursive';
    expCtx.textAlign = 'left';
    expCtx.fillText('🎨 Anamika\'s Dream World Masterpiece', 80, 805);

    expCtx.fillStyle = '#9274aa';
    expCtx.font = 'italic 22px "Pacifico", cursive';
    expCtx.textAlign = 'right';
    expCtx.fillText('Created by Anamika MG with lots of love ♡', 1120, 805);

    // Trigger download
    const dataUrl = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Anamika-Drawing-${Date.now().toString().slice(-4)}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Confetti celebration
    if (typeof window.createHearts === 'function') {
      window.createHearts(30);
    }
  }

  setupControls() {
    // Tool buttons
    document.querySelectorAll('.draw-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTool(btn.dataset.tool);
      });
    });

    // Color Swatches
    document.querySelectorAll('.draw-color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        this.setColor(sw.dataset.color);
      });
    });

    // Custom Color Input
    const customColorInput = document.getElementById('drawCustomColor');
    if (customColorInput) {
      customColorInput.addEventListener('input', (e) => {
        this.setColor(e.target.value);
      });
    }

    // Brush Size presets
    document.querySelectorAll('.size-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setBrushSize(btn.dataset.size);
      });
    });

    // Size Slider
    const sizeSlider = document.getElementById('brushSizeSlider');
    if (sizeSlider) {
      sizeSlider.addEventListener('input', (e) => {
        this.setBrushSize(e.target.value);
      });
    }

    // Stickers
    document.querySelectorAll('.stamp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setStamp(btn.dataset.stamp);
      });
    });

    // Templates
    document.querySelectorAll('.template-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTemplate(btn.dataset.template);
      });
    });
  }
}

window.drawingRoom = new DrawingRoom();

