let allData = [];

// Đọc file CSV khi tải trang
Papa.parse("data.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    allData = results.data;
  }
});

// Hàm thực hiện tìm kiếm
function searchByDDCN() {
  const ddcn = document.getElementById("ddcnInput").value.trim();
  const messageDiv = document.getElementById("message");
  const table = document.getElementById("resultTable");

  messageDiv.textContent = "";
  table.innerHTML = "";

  if (!ddcn) {
    messageDiv.textContent = "Vui lòng nhập Số ĐDCN.";
    return;
  }

  // Lọc dữ liệu theo Số ĐDCN (so khớp chính xác)
  const results = allData.filter(row => row[DDCN] === ddcn);

  if (results.length === 0) {
    messageDiv.textContent = "Không tìm thấy dữ liệu cho Số ĐDCN này.";
    return;
  }

  // Tạo bảng kết quả
  const headers = Object.keys(results[0]);
  let headerRow = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
  let bodyRows = results.map(row => {
    return "<tr>" + headers.map(h => `<td>${row[h] || ""}</td>`).join("") + "</tr>`;
  }).join("");

  table.innerHTML = headerRow + bodyRows;
}

// Sự kiện khi bấm nút
document.getElementById("searchBtn").addEventListener("click", searchByDDCN);

// Sự kiện khi nhấn Enter trong ô input
document.getElementById("ddcnInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchByDDCN();
  }
});

