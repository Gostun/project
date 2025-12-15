
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");
  const dropZone = document.getElementById("dropZone");
  const imageInput = document.getElementById("imageInput");
  const preview = document.getElementById("preview");
  const previewContainer = document.getElementById("objectPreview");
  let files = [];
  let editingId = null;

  function updatePreview() {
    preview.innerHTML = "";
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const item = document.createElement("div");
        item.className = "preview-item";
        item.innerHTML = `
          <img src="${reader.result}" />
          <button data-index="${index}">&times;</button>
        `;
        item.querySelector("button").addEventListener("click", () => {
          files.splice(index, 1);
          updatePreview();
        });
        preview.appendChild(item);
      };
      reader.readAsDataURL(file);
    });
  }

  dropZone.addEventListener("click", () => imageInput.click());
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#999";
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "#ccc";
  });
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    files = files.concat(dropped);
    updatePreview();
  });

  imageInput.addEventListener("change", () => {
    files = files.concat(Array.from(imageInput.files));
    updatePreview();
  });

  function loadObjects() {
    fetch("https://admin-production-9fc0.up.railway.app/api/objects")
      .then(res => res.json())
      .then(objects => {
        previewContainer.innerHTML = "";
        objects.forEach(obj => {
          const div = document.createElement("div");
          div.className = "preview-card";
          const images = obj.images ? JSON.parse(obj.images) : [];
          div.innerHTML = `
            <strong>${obj.type}</strong> — ${obj.city}, ${obj.district}<br/>
            Цена: ${obj.price} ₽<br/>
            ${images.map(img => `<img src="https://admin-production-9fc0.up.railway.app${img}" width="80"/>`).join("")}<br/>
            <button data-id="${obj.id}" class="edit-btn">✏️ Редактировать</button>
            <button data-id="${obj.id}" class="delete-btn">🗑️ Удалить</button>
          `;

          div.querySelector(".delete-btn").addEventListener("click", () => {
            const id = obj.id;
            if (confirm("Удалить объект?")) {
              fetch(`https://admin-production-9fc0.up.railway.app/api/objects/${id}`, {
                method: "DELETE"
              }).then(res => {
                if (!res.ok) throw new Error("Ошибка при удалении");
                return res.json();
              }).then(() => loadObjects())
                .catch(err => alert("Ошибка удаления: " + err.message));
            }
          });

          div.querySelector(".edit-btn").addEventListener("click", () => {
            form.type.value = obj.type;
            form.city.value = obj.city;
            form.district.value = obj.district;
            form.price.value = obj.price;
            form.description.value = obj.description;
            form.isPopular.checked = obj.isPopular === 1 || obj.isPopular === true || obj.isPopular === "1";
            editingId = obj.id;
            window.scrollTo({ top: 0, behavior: "smooth" });
          });

          previewContainer.appendChild(div);
        });
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const rawPrice = form.price.value.replace(/[^\d]/g, '');
    const numericPrice = parseInt(rawPrice);
    if (isNaN(numericPrice)) {
      alert("Введите корректную цену (только цифры)");
      return;
    }
    formData.set("price", numericPrice);
    formData.set("isPopular", form.isPopular.checked);
    files.forEach(file => formData.append("images", file));
const url = editingId
  ? `https://admin-production-9fc0.up.railway.app/api/objects/${editingId}`
  : "https://admin-production-9fc0.up.railway.app/api/objects";

const method = editingId ? "PUT" : "POST";

const isEditing = !!editingId;

const fetchOptions = isEditing
  ? {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: form.type.value,
        city: form.city.value,
        district: form.district.value,
        price: numericPrice,
        description: form.description.value,
        isPopular: form.isPopular.checked
      })
    }
  : {
      method: "POST",
      body: formData
    };

fetch(url, fetchOptions)
  .then(res => {
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    return res.json();
  })
  .then(() => {
    files = [];
    editingId = null;
    form.reset();
    preview.innerHTML = "";
    loadObjects();
  })
  .catch(err => alert("Ошибка при сохранении: " + err.message));
  }); // ← закрытие form.addEventListener
});   // ← закрытие DOMContentLoaded

