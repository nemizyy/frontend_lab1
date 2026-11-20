const form = document.querySelector("#student-form");

const validators = [
  {
    input: document.querySelector("#full-name"),
    regex: /^[А-ЯІЇЄҐ][А-ЯІЇЄҐа-яіїєґ'’\-]+\s+[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/u,
    message: "Формат ПІБ: Прізвище І.П.",
  },
  {
    input: document.querySelector("#variant"),
    regex: /^\d{2}$/u,
    message: "Формат варіанта: дві цифри, наприклад 09.",
  },
  {
    input: document.querySelector("#group"),
    regex: /^[А-ЯІЇЄҐA-Z]{2}-\d{2}$/iu,
    message: "Формат групи: ІО-43.",
  },
  {
    input: document.querySelector("#faculty"),
    regex: /^[А-ЯІЇЄҐA-Z]{4}$/iu,
    message: "Формат факультету: чотири літери, наприклад ФІОТ.",
  },
  {
    input: document.querySelector("#birth-date"),
    regex: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19\d{2}|20\d{2})$/u,
    message: "Формат дати народження: ДД.MM.РРРР.",
  },
];

function isRealDate(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (!match) return false;

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.getFullYear() === Number(year)
    && date.getMonth() === Number(month) - 1
    && date.getDate() === Number(day);
}

function validateField(rule) {
  const value = rule.input.value.trim();
  const row = rule.input.closest("[data-field-row]");
  const error = row.querySelector(".error");
  const valid = rule.regex.test(value)
    && (rule.input.id !== "birth-date" || isRealDate(value));

  row.classList.toggle("invalid", !valid);
  rule.input.setAttribute("aria-invalid", String(!valid));
  error.textContent = valid ? "" : rule.message;
  return valid;
}

validators.forEach((rule) => {
  rule.input.addEventListener("input", () => {
    if (rule.input.closest("[data-field-row]").classList.contains("invalid")) {
      validateField(rule);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const results = validators.map(validateField);
  if (results.includes(false)) {
    validators.find((rule) => !validateField(rule))?.input.focus();
    return;
  }

  const result = document.querySelector("#form-result");
  result.replaceChildren();

  validators.forEach((rule) => {
    const label = document.querySelector(`label[for="${rule.input.id}"]`).textContent;
    const row = document.createElement("p");
    row.className = "result-row";

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    row.append(strong, document.createTextNode(rule.input.value.trim()));
    result.append(row);
  });
});

const table = document.querySelector("#number-table");
const colorPicker = document.querySelector("#color-picker");

for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
  const row = table.insertRow();
  for (let columnIndex = 0; columnIndex < 6; columnIndex += 1) {
    const number = rowIndex * 6 + columnIndex + 1;
    const cell = row.insertCell();
    cell.textContent = String(number);
    cell.dataset.number = String(number);

    if (number === 9) {
      cell.classList.add("variant-cell");

      cell.addEventListener("mouseenter", () => {
        const randomColor = `hsl(${Math.floor(Math.random() * 360)} 75% 65%)`;
        cell.style.backgroundColor = randomColor;
      });

      cell.addEventListener("click", () => {
        cell.style.backgroundColor = colorPicker.value;
      });

      cell.addEventListener("dblclick", () => {
        for (let rowNumber = rowIndex; rowNumber < 6; rowNumber += 2) {
          table.rows[rowNumber].cells[columnIndex].style.backgroundColor = colorPicker.value;
        }
      });
    }
  }
}
