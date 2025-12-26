// function updateFilterBadge() {
//   let count = 0;
//   if (filterState.rating) count++;
//   if (filterState.nearby) count++;
//   if (filterState.services.length) count++;
//   if (filterState.price) count++;

//   document.getElementById("filterCount").textContent =
//     count ? `(${count})` : "";
// }

// bottom sheet dropdown
// const filterSheet = document.querySelector(".filter-sheet");

// document.querySelector(".dropdown-toggle").addEventListener("click", () => {
//     filterSheet.classList.toggle("active");
// });
function disableMap() {
    if (!window.map) return;
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
}

function enableMap() {
    if (!window.map) return;
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
}









const sheet = document.getElementById("sheet");
const header = document.getElementById("sheetHeader");

header.addEventListener("click", () => {
    if (sheet.classList.contains("mini")) {
        sheet.classList.remove("mini");
        sheet.classList.add("full");
    } else {
        sheet.classList.remove("full");
        sheet.classList.add("mini");
    }
});


document.addEventListener(
    "touchmove",
    e => {
        if (!dragging) return;
        const delta = e.touches[0].clientY - startY;
        setTranslate(startTranslate + delta);
        e.preventDefault();
    },
    { passive: false }
);

document.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;
    sheet.classList.remove("dragging");

    // snap
    const distances = Object.values(SNAP);
    const closest = distances.reduce((a, b) =>
        Math.abs(b - currentTranslate) < Math.abs(a - currentTranslate) ? b : a
    );

    setTranslate(closest);

    // mở lại map
    map.dragging.enable();
    map.touchZoom.enable();
});









let selectedPriceFilter = ""; // <-- THÊM
const priceDropdown = document.getElementById("priceDropdown");
const priceToggle = document.getElementById("priceToggle");
const priceLabel = document.getElementById("priceLabel");
const priceOptions = document.querySelectorAll(".price-option");

// Toggle price dropdown
priceToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    priceDropdown.classList.toggle("active");
    document.getElementById("filterDropdown").classList.remove("active");
});

// Chọn giá
priceOptions.forEach(option => {
    option.addEventListener("click", () => {
        priceOptions.forEach(o => o.classList.remove("active"));
        option.classList.add("active");

        priceLabel.textContent = option.textContent;
        selectedPriceFilter = option.dataset.value; // 🔥 QUAN TRỌNG
        priceDropdown.classList.remove("active");
    });
});

//   // Chọn option
priceOptions.forEach(option => {
    option.addEventListener('click', () => {
        priceOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        priceLabel.textContent = option.textContent;
        priceDropdown.classList.remove('active');

        const value = option.dataset.value;
        console.log('Price filter:', value);
    });
});

document.addEventListener('click', () => {
    priceDropdown.classList.remove('active');
});


const toggle = document.getElementById("filterToggle");
const dropdown = document.getElementById("filterDropdown");

toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
    priceDropdown.classList.remove("active");
});



// document.addEventListener("click", () => {
//     dropdown.classList.remove("active");
//     priceDropdown.classList.remove("active");
// });




document.addEventListener("DOMContentLoaded", () => {
    window.map = L.map("map").setView([21.0285, 105.8542], 13); // Hà Nội
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    map.on("mousedown touchstart", () => {
        setTranslate(SNAP.mini);
    });




    const locations = [
        {
            name: "Gara Quang Tiến",
            lat: 21.0755,
            lng: 105.7990,
            address: "Cuối Ngõ 126 Đ. Xuân Đỉnh, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Xuân Đỉnh",
            ward: "Xuân Đỉnh",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4.5,
            phone: "0968372332",
            hours: "6:00 AM - 6:00 PM",
            services: "Sửa ô tô",
            price: "700000"
        },
        {
            name: "Gara Bình An",
            lat: 21.0763,
            lng: 105.7851,
            address: "136 Đ. Phạm Văn Đồng, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Phạm Văn Đồng",
            ward: "Xuân Đỉnh",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5.0,
            phone: "0974934648",
            hours: "8:00 AM - 6:00 PM",
            services: "Sửa ô tô",
            price: "1200000"
        },
        {
            name: "Gara Trường Phát",
            lat: 21.0898,
            lng: 105.7855,
            address: "102 Đ. Tân Xuân, Đông Ngạc, Bắc Từ Liêm, Hà Nội , Việt Nam",
            street: "Tân Xuân",
            ward: "Đông Ngạc",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4.5,
            phone: "02437579573",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa ô tô",
            price: "900000"
        },
        {
            name: "Gara Tâm Bình",
            lat: 21.0580,
            lng: 105.7818,
            address: "442 Đ. Phạm Văn Đồng, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Phạm Văn Đồng",
            ward: "Cổ Nhuế",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4,
            phone: "0984043606",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa ô tô",
            price: "2500000"
        },
        {
            name: "Gara An Lộc",
            lat: 21.0700,
            lng: 105.7884,
            address: "Lô 32-33, P. Lộc, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Lộc",
            ward: "Xuân Đỉnh",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4,
            phone: "0961221999",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa ô tô",
            price: "1500000"
        },
        {
            name: "Thái Honda Motor",
            lat: 21.0717,
            lng: 105.7724,
            address: "3 P. Viên, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Phố Viên",
            ward: "Cổ Nhuế",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4,
            phone: "0929637979",
            hours: "7:00 AM - 8:00 PM",
            services: "Sửa xe máy",
            price: "600000"
        },
        {
            name: "Nam Việt Motor",
            lat: 21.0664,
            lng: 105.7728,
            address: "188 P. Viên, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Phố Viên",
            ward: "Cổ Nhuế",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5,
            phone: "0969743097",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe máy",
            price: "800000"
        },
        {
            name: "Vinh Motor",
            lat: 21.0694,
            lng: 105.7782,
            address: "489 Đ. Cổ Nhuế, Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Cổ Nhuế",
            ward: "Cổ Nhuế",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 3.5,
            phone: "0326196666",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe máy",
            price: "1100000"
        },
        {
            name: "Phương Motor",
            lat: 21.0808,
            lng: 105.7848,
            address: "369 Đ. Xuân Đỉnh, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Xuân Đỉnh",
            ward: "Xuân Đỉnh",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5,
            phone: "0353121919",
            hours: "7:00 AM - 9:00 PM",
            services: "Sửa xe máy",
            price: "650000"
        },
        {
            name: "Anh Trọng Motor",
            lat: 21.0842,
            lng: 105.7716,
            address: "111 Tân Nhuệ, Thuỵ Phương, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Tân Nhuệ",
            ward: "Thuỵ Phương",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5,
            phone: "0977055762",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe máy",
            price: "750000"
        },
        {
            name: "Phụ tùng xe điện ngọc anh",
            lat: 21.0843,
            lng: 105.777,
            address: "24 Đ.Thụy Phương, Đông Ngạc, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Thụy Phương",
            ward: "Đông Ngạc",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5,
            phone: "0368645556",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe đạp điện",
            price: "350000"
        },
        {
            name: "Th Bike Trung Tâm Sửa Chữa Xe Điện",
            lat: 21.0709,
            lng: 105.7955,
            address: "1 Ng. 205 Đ. Xuân Đỉnh, Xuân Đỉnh, Tây Hồ, Hà Nội, Việt Nam",
            street: "Xuân Đỉnh",
            ward: "Xuân Đỉnh",
            district: "Tây Hồ",
            city: "Hà Nội",
            rating: 5,
            phone: "0978964562",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe đạp điện",
            price: "200000"
        },
        {
            name: "SỬA XE ĐIỆN XE ĐẠP HỮU TÍN",
            lat: 21.0814,
            lng: 105.7854,
            address: "66 Đ. Tân Xuân, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội, Việt Nam",
            street: "Tân Xuân",
            ward: "Xuân Đỉnh",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5,
            phone: "0984435708",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe đạp điện",
            price: "250000"
        },
        {
            name: "Xedapdien.vn",
            lat: 21.0608,
            lng: 105.7838,
            address: "427 Đ. Phạm Văn Đồng, Cổ Nhuế, Bắc Từ Liêm, Hà Nội 10000, Việt Nam",
            street: "Phạm Văn Đồng",
            ward: "Cổ Nhuế",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4.5,
            phone: "18009473",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe đạp điện",
            price: "350000"
        },
        {
            name: "Xe điện Hùng Kiên",
            lat: 21.0449,
            lng: 105.7620,
            address: "số 7 Ngách 259/57, Đ. Phú Diễn, Cầu Diễn, Bắc Từ Liêm, Hà Nội 100000, Việt Nam",
            street: "Phú Diễn",
            ward: "Cầu Diễn",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 4,
            phone: "0977830065",
            hours: "7:00 AM - 7:00 PM",
            services: "Sửa xe đạp điện",
            price: "300000"
        },
        {
            name: "Thay Ắc Quy Xe Đạp Điện Chính Hãng",
            lat: 21.0751,
            lng: 105.7729,
            address: "ngõ 59/14 P. Lê Văn Hiến, Đông Ngạc, Bắc Từ Liêm, Hà Nội 11910, Việt Nam",
            street: "Lê Văn Hiến",
            ward: "Đông Ngạc",
            district: "Bắc Từ Liêm",
            city: "Hà Nội",
            rating: 5,
            phone: "0944650333",
            hours: "8:00 AM - 7:00 PM",
            services: "Sửa xe đạp điện",
            price: "400000"
        },
    ];

    let userPosition = null; // Lưu vị trí người dùng
    let routeLine = null; // Để lưu trữ đường đi vẽ trên bản đồ
    const makers = [];
    const locationList = document.getElementById("location-list");

    function renderLocations(data) {
        makers.forEach(m => map.removeLayer(m));
        makers.length = 0;

        locationList.innerHTML = "";

        data.forEach(loc => {
            const marker = L.marker([loc.lat, loc.lng]).addTo(map)
                .bindPopup(`
      <b>${loc.name}</b><br>
      ${loc.address}<br>
      ⭐ ${loc.rating} <br>
      📞 ${loc.phone}<br>
      ⏰ Giờ hoạt động: ${loc.hours}<br>
      🛠️ Dịch vụ: ${loc.services}<br>
	  💵 Giá trung bình: ${loc.price} VNĐ<br>
      <button class="route-button" onclick="getRoute(${loc.lat}, ${loc.lng})"> 📍 Chỉ đường </button>
    `);
            makers.push(marker);

            const originalIndex = locations.indexOf(loc);
            const li = document.createElement("li");
            li.innerHTML = `
        <strong>${loc.name}</strong><br>
        ${loc.address}<br>
		<strong><span style="color: green;">Giá trung bình: ${loc.price} VNĐ</span></strong><br>
        🛠️${loc.services}<br>
        ⭐ ${loc.rating}
        <button onclick="focusMap(${originalIndex})">Xem trên bản đồ</button>
       `;

            li.onclick = () => {
                map.setView([location.lat, location.lng], 15);
                sheet.className = "gm-bottom-sheet half";
            };



            locationList.appendChild(li);
        });
    }

    renderLocations(locations);


    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase().trim();

        const filtered = locations.filter(loc =>
            loc.name.toLowerCase().includes(keyword) ||
            loc.address.toLowerCase().includes(keyword) ||
            loc.street.toLowerCase().includes(keyword) ||
            loc.ward.toLowerCase().includes(keyword) ||
            loc.district.toLowerCase().includes(keyword) ||
            loc.city.toLowerCase().includes(keyword)
        );
        renderLocations(filtered);
    });

    // Hiển thị tất cả các marker
    const markers = locations.map((location) => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);

        // Thêm tooltip hiển thị tên địa điểm
        marker.bindTooltip(location.name, {
            permanent: true, // Hiển thị cố định
            direction: "top", // Vị trí trên marker
            offset: [0, -10], // Dịch tooltip lên trên marker
        });

        // Thêm thông tin chi tiết vào pop-up
        marker.bindPopup(`
      <b>${location.name}</b><br>
      ${location.address}<br>
      ⭐ ${location.rating} <br>
      📞 ${location.phone}<br>
      ⏰ Giờ hoạt động: ${location.hours}<br>
      🛠️ Dịch vụ: ${location.services}<br>
	  💵 Giá trung bình: ${location.price} VNĐ<br>
      <button class="route-button" onclick="getRoute(${location.lat}, ${location.lng})"> 📍 Chỉ đường </button>
    `);

        return marker;
    });

    // Hiển thị danh sách địa điểm
    function updateLocationList(filteredLocations) {
        locationList.innerHTML = "";
        filteredLocations.forEach((location) => {
            const originalIndex = locations.indexOf(location); // Lấy chỉ mục thực sự từ mảng gốc
            const li = document.createElement("li");
            li.innerHTML = `
        <strong>${location.name}</strong><br>
        ${location.address}<br>
		<strong><span style="color: green;">Giá trung bình: ${location.price} VNĐ</span></strong><br>
        🛠️${location.services}<br>
        ⭐ ${location.rating}
        <button onclick="focusMap(${originalIndex})">Xem trên bản đồ</button>
      `;
            locationList.appendChild(li);
        });
    }

    updateLocationList(locations);

    // Lọc địa điểm
    document.getElementById("filter-btn").addEventListener("click", () => {
        const highRatingChecked = document.getElementById("high-rating").checked;
        const nearbyChecked = document.getElementById("nearby").checked;
        const motorbikeChecked = document.getElementById("motorbike").checked;
        const carChecked = document.getElementById("car").checked;
        const bicycleChecked = document.getElementById("bicycle").checked;
        const priceFilter = selectedPriceFilter;


        let filteredLocations = locations.filter((loc) => {
            let matches = true;

            // Điều kiện: Đánh giá cao
            if (highRatingChecked && loc.rating < 4.5) {
                matches = false;
            }

            // Điều kiện: Gần bạn
            if (
                nearbyChecked &&
                userPosition &&
                getDistance(userPosition.lat, userPosition.lng, loc.lat, loc.lng) > 2
            ) {
                matches = false;
            }

            // Điều kiện: Sửa xe máy
            if (motorbikeChecked && loc.services !== "Sửa xe máy") {
                matches = false;
            }

            // Điều kiện: Sửa ô tô
            if (carChecked && loc.services !== "Sửa ô tô") {
                matches = false;
            }
            // Điều kiện: Sửa xe đạp điện
            if (bicycleChecked && loc.services !== "Sửa xe đạp điện") {
                matches = false;
            }
            // Điều kiện: Giá cả
            switch (priceFilter) {
                case "over2m":
                    matches = matches && loc.price > 2000000;
                    break;

                case "100000-500000":
                    matches = matches && loc.price >= 100000 && loc.price <= 500000;
                    break;

                case "500000-1000000":
                    matches = matches && loc.price >= 500000 && loc.price <= 1000000;
                    break;

                case "1000000-2000000":
                    matches = matches && loc.price >= 1000000 && loc.price <= 2000000;
                    break;
            }


            return matches;
        });
        // Sorting based on price after initial filtering
        if (priceFilter === "low-high") {
            filteredLocations.sort((a, b) => a.price - b.price);
        }
        if (priceFilter === "high-low") {
            filteredLocations.sort((a, b) => b.price - a.price);
        }

        console.log("Filtered Locations:", filteredLocations);
        // Hiển thị các địa điểm đã lọc (ví dụ: cập nhật giao diện UI)


        // Cập nhật danh sách và ẩn marker không cần thiết
        updateLocationList(filteredLocations);
        markers.forEach((marker, index) => {
            const location = locations[index];
            // Kiểm tra xem địa điểm này có nằm trong kết quả lọc hay không
            if (filteredLocations.includes(location)) {
                marker.setOpacity(1); // Hiện marker
                marker.getTooltip().setOpacity(1); //Hiện tooltip
            } else {
                marker.setOpacity(0); // Ẩn marker (không cần xóa khỏi bản đồ)
                marker.getTooltip().setOpacity(0); // Ẩn tooltip
            }
        });

    });

    // Lấy vị trí người dùng
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                L.marker([userPosition.lat, userPosition.lng], {
                    icon: L.icon({
                        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                        iconSize: [45, 45],
                    }),
                })

                    .addTo(map)
                    .bindPopup('<div style="font-weight: bold; font-size: 17px; color: #333;">Bạn đang ở đây!</div>')
                    .openPopup();
                map.setView([userPosition.lat, userPosition.lng], 17);
                if (nearbyRepairPoints.length > 0) {
                    nearbyRepairPoints.forEach(async point => {
                        // Lấy địa chỉ từ Nominatim
                        const address = await getAddressFromCoordinates(point.lat, point.lng);

                        // Đánh dấu từng điểm sửa xe với địa chỉ từ OpenStreetMap
                        L.marker([point.lat, point.lng]).addTo(map)
                            .bindPopup(`<b>${point.name}</b><br>Địa chỉ: ${address}<br><button onclick="getRoute(${userLat}, ${userLng}, ${point.lat}, ${point.lng})">Tìm đường</button>`);
                    });

                    // Phóng to để hiển thị cả vị trí người dùng và các điểm sửa xe gần nhất
                    map.setView([userLat, userLng], 14);
                } else {
                    alert("Không tìm thấy điểm sửa xe nào trong bán kính 10km.");
                }
            },
            (error) => {
                console.error("Lỗi định vị: ", error.message);
            }
        );
    } else {
        alert("Trình duyệt không hỗ trợ định vị GPS.");
    }

    // Hàm lấy tuyến đường từ OSRM API
    async function drawRoute(userLat, userLng, destLat, destLng) {
        const url = `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destLng},${destLat}?overview=full&geometries=geojson&steps=true`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0].geometry.coordinates;
                const latLngs = route.map(coord => [coord[1], coord[0]]);

                // Xóa đường cũ nếu có
                if (routeLine) {
                    map.removeLayer(routeLine);
                }

                // Vẽ đường đi mới
                routeLine = L.polyline(latLngs, {
                    color: 'blue',          // Màu xanh dương
                    weight: 7,              // Độ dày của đường
                    opacity: 0.6,           // Độ mờ (0.6 là 60% hiển thị)
                    lineJoin: 'round',      // Các góc tròn mềm mại
                    lineCap: 'round',       // Đầu và đuôi đường tròn đẹp 


                }).addTo(map);


                map.fitBounds(routeLine.getBounds());

                // Tính khoảng cách giữa hai điểm
                const distance = getDistance(userLat, userLng, destLat, destLng).toFixed(2); // khoảng cách tính được (km)

                // Hiển thị khoảng cách trong popup của tuyến đường
                routeLine.bindPopup(`<b>Khoảng cách: ${distance} km</b>`).openPopup();
            } else {
                alert("Không tìm thấy đường đi.");
            }
        } catch (error) {
            console.error("Lỗi khi vẽ đường:", error);
            alert("Đã xảy ra lỗi khi lấy dữ liệu tuyến đường.");
        }
        map.on('click', () => {
            if (routeLine) {
                map.removeLayer(routeLine); // xóa chỉ đường khi ấn vào bản đồ
                routeLine = null;
            }
        });

    }

    // Hàm tập trung bản đồ vào vị trí
    window.focusMap = (index) => {
        const location = locations[index];
        map.setView([location.lat, location.lng], 15);
        markers[index].openPopup();
    };

    // Tính khoảng cách giữa hai điểm (Haversine Formula)
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Bán kính Trái Đất (km)
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Khoảng cách (km)
    }
    // Chỉ đường từ vị trí người dùng
    window.getRoute = (lat, lng) => {
        if (!userPosition) {
            alert("Vui lòng cho phép truy cập vị trí của bạn để sử dụng tính năng chỉ đường.");
            return;
        }
        drawRoute(userPosition.lat, userPosition.lng, lat, lng);
    };

    // Xóa tuyến đường hiện tại (nếu cần)
    window.clearRoute = () => {
        if (routeLine) {
            map.removeLayer(routeLine);
            routeLine = null;
        }
    };
});

