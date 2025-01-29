## **📌 `ProgressCircle API`**
Это описание методов и опций, которые можно использовать при работе с `ProgressCircle`.

---

### **📌 Создание экземпляра**
```js
const progress = new ProgressCircle(selector, options);
```
| Параметр  | Тип       | Описание |
|-----------|----------|----------|
| `selector` | `string` | CSS-селектор контейнера, куда будет вставлен прогресс-бар. |
| `options`  | `object` | Опциональные настройки (см. ниже). |

---

### **📌 Опции (передаются в `options`)**
| Свойство      | Тип     | По умолчанию | Описание                         |
|---------------|--------|-------------|----------------------------------|
| `size`        | `number` | `150`       | Размер (ширина и высота в `px`). |
| `strokeWidth` | `number` | `8`         | Толщина линии.                   |
| `color`       | `string` | `#007bff`   | Цвет основной дуги (`stroke`).   |
| `bgColor`     | `string` | `#ddd`      | Цвет фоновой дуги (`stroke`).    |
| `value`       | `number` | `0`         | Начальное значение (0-100).      |
| `animated`    | `boolean` | `false`   | Состояние "загрузки".            |
| `hidden`      | `boolean` | `false`   | Скрыт ли прогресс-бар.           |

---

### **📌 Методы**

#### **1. `setValue(value, animated = true)`**
📌 Устанавливает текущее значение прогресс-бара.

```js
progress.setValue(50); // Установит 50%
progress.setValue(75, false); // Изменит на 75% без анимации
```
| Параметр   | Тип      | Описание                                                            |
|------------|---------|---------------------------------------------------------------------|
| `value`    | `number` | Новое значение (от `0` до `100`).                                   |
| `animated` | `boolean` | Использовать ли анимацию при изменении value (по умолчанию `true`). |

---

#### **2. `setAnimated(animated)`**
📌 Включает или отключает анимацию бесконечной загрузки.

```js
progress.setAnimated(true);  // Включит анимацию
progress.setAnimated(false); // Выключит анимацию
```
| Параметр  | Тип      | Описание |
|-----------|---------|----------|
| `animated` | `boolean` | Включить (`true`) или выключить (`false`) анимацию. |

---

#### **3. `setHidden(hidden)`**
📌 Показывает или скрывает прогресс-бар.

```js
progress.setHidden(true);  // Скрыть прогресс-бар
progress.setHidden(false); // Показать прогресс-бар
```
| Параметр  | Тип      | Описание |
|-----------|---------|----------|
| `hidden`  | `boolean` | Скрыть (`true`) или показать (`false`). |

---

## **📌 Примеры использования**
### **🔹 1. Базовое использование**
```js
const progress = new ProgressCircle("#progress-container", {
    size: 120,
    strokeWidth: 10,
    color: "#ff5733",
    bgColor: "#eee",
    value: 30
});

progress.setValue(60);  // Установит 60%
```

---

### **🔹 2. Прогресс загрузки**
```js
let progressValue = 0;
const progress = new ProgressCircle("#progress-container", { value: 0 });

const interval = setInterval(() => {
    progressValue += 10;
    progress.setValue(progressValue);

    if (progressValue >= 100) clearInterval(interval);
}, 500);
```

---

### **🔹 3. Скрытие и отображение**
```js
const progress = new ProgressCircle("#progress-container", { value: 50 });

document.getElementById("toggle").addEventListener("click", () => {
    progress.setHidden(!progress.progressContainer.classList.contains("hidden"));
});
```
