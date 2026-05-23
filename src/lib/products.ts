export type Lang = "en" | "vi";
export type Category = "posture" | "sensory" | "care";

export type Product = {
  id: number;
  price: number;
  originalPrice?: number;
  colors: string[];
  category: Category;
  image: string;
  en: {
    name: string;
    description: string;
    categoryLabel: string;
    features: string[];
    whatsInBox: string[];
    forWho: string;
  };
  vi: {
    name: string;
    description: string;
    categoryLabel: string;
    features: string[];
    whatsInBox: string[];
    forWho: string;
  };
};

export const PRODUCTS: Product[] = [
  {
    id: 1, price: 3990000, originalPrice: 4850000, colors: ["Mint"], category: "posture",
    image: "/images/desk.png",
    en: {
      name: "Height-Adjustable Standing Desk Pro",
      description: "Compact 60×120 cm standing desk with adjustable height (70–119 cm). Electronic control buttons and smooth dual-motor lifting system. Stylish mint green design perfect for any home office.",
      categoryLabel: "Posture Support",
      features: [
        "Height range: 70–119 cm (sit-to-stand in ~15 seconds)",
        "Dual quiet motors — noise level under 45 dB",
        "60×120 cm desktop — fits dual monitors",
        "Weight capacity: 80 kg",
        "Memory presets: 4 programmable heights",
        "Anti-collision safety sensor",
        "Cable management tray included",
      ],
      whatsInBox: ["Standing desk frame (2 legs)", "Desktop surface (Mint)", "Control panel + power cable", "Cable management tray", "Assembly tools + manual"],
      forWho: "Remote workers, developers, and writers who spend 6+ hours at a desk and want to alternate between sitting and standing to prevent back and neck pain.",
    },
    vi: {
      name: "Bàn Nâng Hạ Độ Cao FlexiSpot E1 Pro",
      description: "Bàn nâng hạ 60×120 cm, điều chỉnh độ cao 70–119 cm. Hệ thống nút bấm điện tử và động cơ đôi nâng mượt mà. Thiết kế màu xanh Mint thời trang, phù hợp mọi góc làm việc tại nhà.",
      categoryLabel: "Hỗ trợ tư thế",
      features: [
        "Điều chỉnh độ cao: 70–119 cm (chuyển đổi trong ~15 giây)",
        "Động cơ đôi êm ái — tiếng ồn dưới 45 dB",
        "Mặt bàn 60×120 cm — đủ chỗ cho 2 màn hình",
        "Tải trọng tối đa: 80 kg",
        "4 vị trí nhớ chiều cao lập trình được",
        "Cảm biến chống va chạm an toàn",
        "Khay quản lý dây cáp đi kèm",
      ],
      whatsInBox: ["Khung bàn (2 chân)", "Mặt bàn màu Mint", "Bảng điều khiển + dây nguồn", "Khay gọn dây", "Dụng cụ lắp ráp + hướng dẫn"],
      forWho: "Dân văn phòng từ xa, lập trình viên, nhà văn — những ai ngồi 6+ giờ/ngày và muốn luân phiên đứng-ngồi để bảo vệ cột sống.",
    },
  },
  {
    id: 2, price: 2545000, originalPrice: 2950000, colors: ["White", "Black", "Blue"], category: "posture",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80",
    en: {
      name: "Height-Adjustable Mobile Desk",
      description: "Compact mobile desk (70×40 cm) with gas-spring lifting system. 360-degree wheels for high mobility — move it anywhere in seconds.",
      categoryLabel: "Posture Support",
      features: [
        "Compact surface: 70×40 cm — perfect for a laptop",
        "Height range: 65–115 cm via gas spring",
        "360° swivel casters with locking brake",
        "Max load: 20 kg",
        "Foldable design for easy storage",
        "Tilt-adjustable surface (0–30°)",
      ],
      whatsInBox: ["Mobile desk frame", "Desktop surface", "4 locking caster wheels", "Assembly screws + Allen key"],
      forWho: "Anyone who works from different rooms, couch workers, people who use a laptop and want a flexible desk they can roll around the house or office.",
    },
    vi: {
      name: "Bàn Làm Việc Di Động Điều Chỉnh Độ Cao",
      description: "Bàn di động gọn nhẹ (70×40 cm) với hệ thống lò xo khí nén. Bánh xe xoay 360 độ linh hoạt — di chuyển dễ dàng trong vài giây.",
      categoryLabel: "Hỗ trợ tư thế",
      features: [
        "Mặt bàn: 70×40 cm — vừa laptop",
        "Điều chỉnh độ cao: 65–115 cm bằng lò xo khí",
        "Bánh xoay 360° có khóa phanh",
        "Tải trọng tối đa: 20 kg",
        "Gấp gọn để cất tiện lợi",
        "Mặt bàn nghiêng được 0–30°",
      ],
      whatsInBox: ["Khung bàn di động", "Mặt bàn", "4 bánh xe có khóa", "Ốc vít + chìa lục giác"],
      forWho: "Người làm việc nhiều phòng, sofa worker, ai dùng laptop và cần bàn di chuyển linh hoạt trong nhà hoặc văn phòng.",
    },
  },
  {
    id: 3, price: 80000, originalPrice: 120000, colors: ["Black", "Silver"], category: "posture",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    en: {
      name: "Portable Laptop Cooling Kickstand",
      description: "Ultra-slim foldable kickstand with 3M adhesive. Aluminum alloy build, adjustable angle (3–16 degrees) to raise your screen and improve posture instantly.",
      categoryLabel: "Posture Support",
      features: [
        "Adjustable tilt: 3–16 degrees",
        "Aluminum alloy — weighs only 28 g",
        "3M adhesive pad — sticks to any laptop",
        "Raises screen by up to 3 cm for better neck alignment",
        "Heat-dissipating design improves airflow by 30%",
        "Folds flat against the laptop when not in use",
      ],
      whatsInBox: ["Kickstand × 1", "Spare 3M adhesive pad × 1"],
      forWho: "Laptop users who type a lot and experience wrist or neck fatigue. Works on any laptop — MacBook, Dell, Lenovo, Asus.",
    },
    vi: {
      name: "Giá Đỡ Laptop Nillkin Tản Nhiệt",
      description: "Đế dán siêu mỏng bằng hợp kim nhôm, dán 3M chắc chắn. Điều chỉnh góc 3–16 độ giúp nâng màn hình và cải thiện tư thế ngay lập tức.",
      categoryLabel: "Hỗ trợ tư thế",
      features: [
        "Điều chỉnh góc nghiêng: 3–16 độ",
        "Hợp kim nhôm — chỉ nặng 28 g",
        "Miếng dán 3M — gắn được lên mọi laptop",
        "Nâng màn hình cao hơn đến 3 cm, giảm đau cổ",
        "Thiết kế tản nhiệt tăng lưu thông không khí 30%",
        "Gập phẳng vào laptop khi không dùng",
      ],
      whatsInBox: ["Giá đỡ × 1", "Miếng dán 3M thay thế × 1"],
      forWho: "Người dùng laptop gõ nhiều, hay bị mỏi cổ hoặc cổ tay. Tương thích với mọi laptop — MacBook, Dell, Lenovo, Asus.",
    },
  },
  {
    id: 4, price: 3900000, originalPrice: 4860000, colors: ["Black"], category: "posture",
    image: "/images/chair.png",
    en: {
      name: "Ergonomic Mesh Office Chair",
      description: "Automatic weight-responsive recline, 3D armrests, and adjustable lumbar support. Full breathable mesh keeps you cool during long sessions.",
      categoryLabel: "Posture Support",
      features: [
        "Auto-recline responds to your body weight (synchronous mechanism)",
        "3D armrests — adjustable height, depth & angle",
        "Adjustable lumbar support — fits any back curve",
        "Seat height: 42–52 cm",
        "Breathable full-mesh back + cushioned seat",
        "360° swivel with smooth-rolling casters",
        "Max load: 120 kg",
        "BIFMA certified",
      ],
      whatsInBox: ["Chair backrest + frame", "Seat cushion", "5-star base + caster wheels (×5)", "Armrests (×2)", "Lumbar cushion", "Assembly tools + manual"],
      forWho: "Office workers and developers who sit for long hours and need proper lumbar + posture support. Ideal for anyone experiencing lower back pain from a regular chair.",
    },
    vi: {
      name: "Ghế Văn Phòng Cao Cấp ErgoStuhl Q1",
      description: "Cơ chế ngả lưng tự động theo trọng lượng, tựa tay 3D và hỗ trợ thắt lưng điều chỉnh. Thiết kế lưới toàn phần giúp thoáng khí suốt ca làm việc dài.",
      categoryLabel: "Hỗ trợ tư thế",
      features: [
        "Ngả lưng tự động theo trọng lượng cơ thể (cơ chế đồng bộ)",
        "Tựa tay 3D — điều chỉnh chiều cao, độ sâu và góc xoay",
        "Hỗ trợ thắt lưng điều chỉnh — phù hợp mọi đường cong lưng",
        "Chiều cao chỗ ngồi: 42–52 cm",
        "Lưng lưới toàn phần + đệm ngồi êm ái",
        "Xoay 360° với bánh xe lăn mượt",
        "Tải trọng tối đa: 120 kg",
        "Đạt chứng nhận BIFMA",
      ],
      whatsInBox: ["Lưng ghế + khung", "Đệm ngồi", "Chân nhện 5 càng + bánh xe (×5)", "Tay vịn (×2)", "Gối lưng", "Dụng cụ lắp ráp + hướng dẫn"],
      forWho: "Dân văn phòng và lập trình viên ngồi nhiều giờ, cần hỗ trợ đúng thắt lưng và cột sống. Phù hợp cho ai bị đau lưng dưới do ghế thường.",
    },
  },
  {
    id: 5, price: 300000, originalPrice: 460000, colors: ["Black", "Blue", "Red"], category: "posture",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    en: {
      name: "Posture Correction Seat Cushion",
      description: "Curved elastic backrest supports natural spine alignment. Made from durable PP material with memory foam padding for all-day comfort.",
      categoryLabel: "Posture Support",
      features: [
        "Curved design follows natural lumbar curve",
        "Memory foam + PP hard shell — soft outside, rigid support inside",
        "Adjustable strap fits any chair",
        "Machine washable cover",
        "Lightweight — 480 g",
        "Available in Black, Blue, Red",
      ],
      whatsInBox: ["Posture cushion × 1", "Adjustable strap × 1", "Washable cover (pre-installed)"],
      forWho: "Anyone who uses a non-ergonomic chair — at home, in the office, on a plane. Great for students and people with mild lower back pain.",
    },
    vi: {
      name: "Ghế đệm chống gù điều chỉnh dáng ngồi",
      description: "Tựa lưng đàn hồi vát cong hỗ trợ cột sống tự nhiên. Làm từ chất liệu nhựa PP bền bỉ với đệm memory foam cho sự thoải mái cả ngày dài.",
      categoryLabel: "Hỗ trợ tư thế",
      features: [
        "Thiết kế cong theo đường cong thắt lưng tự nhiên",
        "Memory foam + vỏ PP cứng — mềm bên ngoài, chắc chắn bên trong",
        "Dây đai điều chỉnh vừa với mọi ghế",
        "Vỏ bọc giặt được bằng máy",
        "Nhẹ — 480 g",
        "Có màu Đen, Xanh, Đỏ",
      ],
      whatsInBox: ["Đệm tựa lưng × 1", "Dây đai điều chỉnh × 1", "Vỏ bọc giặt được (đã lắp sẵn)"],
      forWho: "Ai dùng ghế không công thái học — ở nhà, văn phòng, trên máy bay. Rất tốt cho học sinh sinh viên và người bị đau lưng nhẹ.",
    },
  },
  {
    id: 6, price: 250000, originalPrice: 379000, colors: ["Black"], category: "sensory",
    image: "/images/belt.png",
    en: {
      name: "Posture Corrector Brace with Steel Support",
      description: "Adjustable corrector with steel support bars to keep the spine aligned. Soft, breathable fabric that can be worn under clothing.",
      categoryLabel: "Sensory Protection",
      features: [
        "2 integrated steel support bars for rigid spinal alignment",
        "Adjustable shoulder straps — fits chest 65–110 cm",
        "Breathable cotton-blend inner lining",
        "Discreet enough to wear under a shirt",
        "Velcro adjustable — one size fits most",
        "Recommended wear: 20–30 min/day to start, build up gradually",
      ],
      whatsInBox: ["Posture corrector brace × 1", "Usage guide (EN/VI)"],
      forWho: "Office workers, drivers, and anyone who slouches unconsciously. Especially effective for people who are new to correcting forward-head posture.",
    },
    vi: {
      name: "Đai chống gù lưng có tấm thép hỗ trợ",
      description: "Đai chỉnh tư thế tích hợp thanh thép giúp giữ thẳng cột sống. Vải mềm mại, thoáng khí, mặc được bên trong quần áo.",
      categoryLabel: "Bảo vệ giác quan",
      features: [
        "2 thanh thép hỗ trợ cột sống cứng chắc",
        "Dây đeo vai điều chỉnh — vừa vòng ngực 65–110 cm",
        "Lót trong cotton pha thoáng khí",
        "Đủ kín đáo để mặc bên trong áo",
        "Velcro điều chỉnh được — một cỡ phù hợp hầu hết",
        "Khuyến nghị: bắt đầu 20–30 phút/ngày, tăng dần",
      ],
      whatsInBox: ["Đai chỉnh tư thế × 1", "Hướng dẫn sử dụng (EN/VI)"],
      forWho: "Dân văn phòng, tài xế, và ai có thói quen khom lưng. Đặc biệt hiệu quả cho người mới bắt đầu chỉnh tư thế đầu cổ về phía trước.",
    },
  },
  {
    id: 7, price: 300000, originalPrice: 480000, colors: ["Black"], category: "sensory",
    image: "/images/light.png",
    en: {
      name: "Smart LED Monitor Light Bar",
      description: "5W LED bar with 80 LEDs. RG0 technology reduces blue light. Adjustable color temperature (2700K–6500K) and brightness — zero screen glare.",
      categoryLabel: "Sensory Protection",
      features: [
        "80 high-CRI LEDs (Ra ≥ 95) for true-color lighting",
        "RG0 certified — no harmful blue light",
        "Color temp: 2700K (warm) to 6500K (cool daylight)",
        "Brightness: 10 levels via touch control",
        "Asymmetric optical design — illuminates desk, not screen",
        "Powered by USB-A — no extra adapter",
        "Clip attaches to any monitor 2–10 cm thick",
      ],
      whatsInBox: ["LED monitor light bar × 1", "USB-A cable × 1", "Monitor clip × 1"],
      forWho: "Anyone who works nights or in dim rooms. Essential for developers, designers, and writers who need consistent, eye-safe desk lighting without screen reflections.",
    },
    vi: {
      name: "Đèn Treo Màn Hình LED Xiaomi",
      description: "Đèn LED 5W với 80 bóng. Công nghệ RG0 giảm ánh sáng xanh. Điều chỉnh nhiệt độ màu (2700K–6500K) và độ sáng — không lóa màn hình.",
      categoryLabel: "Bảo vệ giác quan",
      features: [
        "80 LED CRI cao (Ra ≥ 95) cho ánh sáng màu thật",
        "Chứng nhận RG0 — không ánh sáng xanh có hại",
        "Nhiệt độ màu: 2700K (ấm) đến 6500K (ban ngày mát)",
        "Độ sáng: 10 cấp điều chỉnh qua nút cảm ứng",
        "Thiết kế quang học bất đối xứng — soi bàn, không lóa màn hình",
        "Nguồn USB-A — không cần adapter riêng",
        "Kẹp gắn mọi màn hình dày 2–10 cm",
      ],
      whatsInBox: ["Đèn LED treo màn hình × 1", "Cáp USB-A × 1", "Kẹp gắn màn hình × 1"],
      forWho: "Ai làm việc ban đêm hoặc phòng tối. Cần thiết cho lập trình viên, designer, nhà văn cần ánh sáng bàn đồng đều, an toàn cho mắt và không phản chiếu màn hình.",
    },
  },
  {
    id: 8, price: 1300000, originalPrice: 1964000, colors: ["White"], category: "care",
    image: "/images/eye.png",
    en: {
      name: "Steam Eye Massager with 16 Nodes",
      description: "16 vibration nodes and steam function to relax eye muscles, reduce puffiness, and minimize dark circles. USB rechargeable with 3–4 hour battery life.",
      categoryLabel: "Care & Focus",
      features: [
        "16 vibration massage nodes — simulates acupressure",
        "Steam function: heats to 40–42°C for deep relaxation",
        "Built-in music player (Bluetooth 5.0)",
        "5 preset massage modes",
        "Rechargeable via USB — 3–4 hours battery life per charge",
        "Foldable & travel-friendly design",
        "Auto shut-off after 15 minutes",
      ],
      whatsInBox: ["Eye massager × 1", "USB charging cable × 1", "Carry pouch × 1", "Quick guide"],
      forWho: "Remote workers and developers who stare at screens all day. Use for 15 minutes after work to relieve eye strain, tension headaches, and improve sleep quality.",
    },
    vi: {
      name: "Máy Massage Mắt Phun Sương",
      description: "16 điểm rung massage và tính năng phun sương thư giãn cơ mắt, giảm phù nề và quầng thâm. Sạc USB với pin 3–4 giờ.",
      categoryLabel: "Chăm sóc & Tập trung",
      features: [
        "16 điểm rung massage — mô phỏng bấm huyệt",
        "Phun sương nhiệt 40–42°C giúp thư giãn sâu",
        "Trình phát nhạc tích hợp (Bluetooth 5.0)",
        "5 chế độ massage cài sẵn",
        "Sạc qua USB — pin dùng được 3–4 giờ/lần sạc",
        "Thiết kế gấp gọn, tiện mang theo",
        "Tự tắt sau 15 phút",
      ],
      whatsInBox: ["Máy massage mắt × 1", "Cáp sạc USB × 1", "Túi đựng × 1", "Hướng dẫn nhanh"],
      forWho: "Dân văn phòng và lập trình viên nhìn màn hình cả ngày. Dùng 15 phút sau giờ làm để giảm mỏi mắt, đau đầu do căng thẳng và cải thiện giấc ngủ.",
    },
  },
  {
    id: 9, price: 1225000, originalPrice: 2200000, colors: ["White"], category: "care",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1200&q=80",
    en: {
      name: "Smart U-Shaped Neck Massager",
      description: "4 massage modes and infrared heat for deep muscle relaxation. App-controlled with 3 adjustable heat levels. Cordless and portable for home or office use.",
      categoryLabel: "Care & Focus",
      features: [
        "4 massage modes: kneading, pulse, scraping, combination",
        "Infrared heat: 3 levels (38°C / 42°C / 45°C)",
        "Controlled via app (iOS & Android) or manual buttons",
        "Wireless — rechargeable Li-ion battery, ~2 hours per charge",
        "U-shaped design fits neck, shoulders, lower back, and legs",
        "Auto shut-off after 15 minutes for safety",
        "Silent motor — works in the office without disturbing others",
      ],
      whatsInBox: ["Neck massager × 1", "USB-C charging cable × 1", "App connection guide"],
      forWho: "Developers, designers, and anyone with chronic neck and shoulder tension from long desk sessions. Use during breaks for 10–15 minutes to decompress tight muscles.",
    },
    vi: {
      name: "Gối Massage Cổ Vai Gáy Kết Nối App",
      description: "4 chế độ massage và chườm nhiệt hồng ngoại thư giãn cơ sâu. Điều khiển qua App với 3 mức nhiệt điều chỉnh. Không dây, tiện dùng ở nhà hoặc văn phòng.",
      categoryLabel: "Chăm sóc & Tập trung",
      features: [
        "4 chế độ: nhào, xung điện, cạo gió, kết hợp",
        "Chườm nhiệt hồng ngoại: 3 mức (38°C / 42°C / 45°C)",
        "Điều khiển qua App (iOS & Android) hoặc nút bấm trực tiếp",
        "Không dây — pin Li-ion sạc được, ~2 giờ/lần sạc",
        "Thiết kế chữ U vừa cổ, vai, lưng dưới và chân",
        "Tự tắt sau 15 phút để an toàn",
        "Động cơ êm — dùng ở văn phòng không làm phiền người khác",
      ],
      whatsInBox: ["Gối massage × 1", "Cáp sạc USB-C × 1", "Hướng dẫn kết nối App"],
      forWho: "Lập trình viên, designer và ai bị căng cơ cổ vai mãn tính do ngồi bàn lâu. Dùng 10–15 phút trong giờ nghỉ để giải phóng cơ căng cứng.",
    },
  },
];

export const formatPrice = (n: number) => `${n.toLocaleString("en-US")}đ`;
export const getProduct = (id: number) => PRODUCTS.find((p) => p.id === id);