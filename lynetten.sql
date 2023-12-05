CREATE DATABASE webshop_database


USE webshop_database

CREATE TABLE Products (
   productId INT AUTO_INCREMENT PRIMARY KEY,
   productNumber VARCHAR(50),
   productName VARCHAR(255),
   imageURLs TEXT,
   listPrice DECIMAL(10, 2),
   offerPrice DECIMAL(10, 2),
   stockQuantity INT DEFAULT 0,
   description TEXT
);

CREATE TABLE Colors (
   colorId INT AUTO_INCREMENT PRIMARY KEY,
   productId INT,
   colorName VARCHAR(50),
   FOREIGN KEY (productId) REFERENCES Products(productId)
);

CREATE TABLE Categories (
   categoryId INT AUTO_INCREMENT PRIMARY KEY,
   categoryName VARCHAR(100)
);

CREATE TABLE Users (
   userId INT AUTO_INCREMENT PRIMARY KEY,
   email VARCHAR(100),
   password VARCHAR(255),
   newsletterSubscription BOOLEAN DEFAULT FALSE
);
CREATE TABLE Orders (
   orderId INT AUTO_INCREMENT PRIMARY KEY,
   userId INT,
   orderDate DATE,
   totalAmount DECIMAL(10, 2),
   FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE GuestOrders (
   guestOrderId INT AUTO_INCREMENT PRIMARY KEY,
   temporaryUserId VARCHAR(50),
   orderDate DATE,
   totalAmount DECIMAL(10, 2)
);

CREATE TABLE OrderItems (
   orderItemId INT AUTO_INCREMENT PRIMARY KEY,
   orderId INT,
   productId INT,
   quantity INT,
   FOREIGN KEY (orderId) REFERENCES Orders(orderId),
   FOREIGN KEY (productId) REFERENCES Products(productId)
);

CREATE TABLE ProductCategory (
   productCategoryId INT AUTO_INCREMENT PRIMARY KEY,
   productId INT,
   categoryId INT,
   FOREIGN KEY (productId) REFERENCES Products(productId),
   FOREIGN KEY (categoryId) REFERENCES Categories(categoryId)
);


ALTER TABLE OrderItems
ADD COLUMN guestOrderId INT,
ADD CONSTRAINT fk_guestOrderId
    FOREIGN KEY (guestOrderId)
    REFERENCES GuestOrders(guestOrderId);

INSERT INTO Products (productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, Description)
VALUES
  ( 'PA-1324280', 'Toggle 12x48mm', 'https://www.palby.dk/pictures/resize.php/668x668/1041870_XL.jpg', 112.00, null, 7, ' '),
  ( 'PA-1324480', 'Blue Wave Gevindterminal 6mm/wire 4mm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/4aa2e42c28a663b5285c3676b979035b_w250_h250.jpg', 77.00, null, 17, ' '),
  ( 'PA-1325330', 'Blue Wave Øjeterminal 8,5mm/wire 4mm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/c3b8d4509ab5c5e011e112991efb70d2_w250_h250.jpg', 77.00, null, 10, ' '),
  ( 'PA-1326692', 'Blue Wave U-bøjle med låsemøtrik klasse', 'https://www.palby.dk/pictures/resize.php/668x668/1326692_XL.jpg', 824.00, null, 0, ' '),
  ( 'PA-1339550', 'Blue Wave Wirekit til søgelænder eller trappe Ø4/7mm 10m', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/ffb89495c3048ad4723c8ed9e966fbcb_w250_h250.jpg', 595.00, null, 1, ' ')

INSERT INTO Products (productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, Description)
VALUES
  ('PA-1339552', 'Blue Wave vantskrue til søgelænderwire Ø4mm venstre gevind', 'https://www.palby.dk/pictures/resize.php/668x668/1339551_XL.jpg', 138.00, null, 0, ''),
  ('PA-15.0900', 'Plastimo Kapsejladsbøje 188 x 26 cm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/3a67533e6cb6672e592ce88dfc04f7e1_w250_h250.jpg', 2149.00, null, 1, ' '),
  ('PA-1041828', '1852 gummibåd presenning grå 300d l240-300cm b-155cm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/f20ccfa9dd39e3ea0666ee545968b29f_w250_h250.jpg', 479.00, null, 1, ' '),
  ('PA-1041836', '1852 bådpresenning grå 300d polyester L610-670cm b-254cm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/f20ccfa9dd39e3ea0666ee545968b29f_w250_h250.jpg', 1079.00, null, 1, ' '),
  ('PA-1042015', 'Vandski trækstang Ø40x2mm 120cm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/2c1848224740dda88ca55e7e9d30481d_w250_h250.jpg', 1999.00, null, 1, ' '),
  ('PA-1042052', '1852 håndtag sort nylon hul afstand L-170 x 45mm', 'https://www.palby.dk/pictures/resize.php/668x668/1042052_XL.jpg', 39.00, null, 1, ' '),
  ('PA-11.1570', 'Plastimo Rød hætte til kompaspære', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/c52974a9dd8363c88b83373c623d454c_w250_h250.jpg', 36.00, null, 3, ' '),
  ('PA-1114880', 'Bordlampe med flamme effekt & bluetooth', 'https://www.palby.dk/pictures/resize.php/668x668/1114880_XL.jpg', 369.00, null, 4, ' '),
  ('PA-1151784', '1852 Brolys LED med solcellepanel hvid', 'https://www.palby.dk/pictures/resize.php/668x668/1151784_XL.jpg', 199.00, null, 1, ' '),
  ('PA-1151785', 'Dock Edge brolys LED med solcelle, hvid', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/1389346902_fotografenanderandpaaandvej_w250_h250.jpg', 389.00, null, 2, ' '),
  ('PA-1171100', 'Coast PX300 håndlygte 150L med UV lys IPX4 incl. 3xAA batter', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/83cf8d87e0d5776b80bfb17c1d519ff1_w250_h250.jpg', 349.00, null, 3, ' ');

INSERT INTO Products (productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, Description)
VALUES
('PA-14.1452', 'Zink gori 3bls/prop 18"-20"ø23', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/da92c0dd43c660f7ad733f629b6765a3_w250_h250.jpg', 359.00, null, 5, ' '),
('PA-14.1453', 'Gori Zink ring 3-bl. skrueaksel 15"-16.5"', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/1389346902_fotografenanderandpaaandvej_w250_h250.jpg', 329.00, null, 6, ' '),
('PA-14.5000', 'Zink Vetus Bovpropel KW3', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/10f77fc7930c69ea38a74d3a562c5ce5_w250_h250.jpg', 149.00, null, 2, ' '),
('PA-14.5002', 'Zinkanode vetus bovpropel serie ø50', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/d12022d24f5369a65b4f9a722088eac6_w250_h250.jpg', 229.00, null, 4, ' '),
('PA-14.1476', 'Zink Ø35 mm.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/1389346902_fotografenanderandpaaandvej_w250_h250.jpg', 109.00, null, 1, ' '),
('PA-18514001', 'MB Sailor Soul middagstallerken Ø28cm 23', 'https://www.palby.dk/pictures/resize.php/668x668/18514001_XL.jpg', 589.00, null, 3, ' '),
('PA-18514002', 'MB Sailor Soul dybtallerken Ø22cm 218g 6', 'https://www.palby.dk/pictures/resize.php/668x668/18514002_XL.jpg', 579.00, null, 1, ' '),
('PA-18514003', 'MB Sailor Soul desserttallerken Ø20,5cm', 'https://www.palby.dk/pictures/resize.php/668x668/18514003_XL.jpg', 579.00, null, 1, ' '),
('PA-18514004', 'MB Sailor Soul krus Ø8,4cm H10cm 112g 6s', 'https://www.palby.dk/pictures/resize.php/668x668/18514004_XL.jpg', 429.00, null, 1, ' '),
('PA-18514007', 'MB Sailor Soul skål Ø15cm 113g 6stk', 'https://www.palby.dk/pictures/resize.php/668x668/18514007_XL.jpg', 359.00, null, 2, ' '),
('PA-07.0820', 'Septiktank 35 ltr. Rustfrit Stål', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/1389346902_fotografenanderandpaaandvej_w250_h250.jpg', 1799.00, null, 1, ' '),
('PA-07.0920', 'SEPTIKTANKE 56 L. RF', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/1389346902_fotografenanderandpaaandvej_w250_h250.jpg', 999.00, null, 1, ' '),
('PA-07.2064', 'Jabsco "Lite Flush" M/Fodkontakt', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/e68c29a4e32392c28b82964929b32d15_w250_h250.jpg', 6429.00, null, 0, ' '),
('PA-07.0090', 'EL-TOILET 12 V', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/4f005976131e5da63a3208e24c6927be_w250_h250.jpg', 2999.00, null, 4, ' '),
('PA-08.0510', 'Plastimo Vandtank 100 ltr.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/984542ff8a5788fa99661899aa6d7d90_w250_h250.jpg', 839.00, null, 2, ' '),
('PA-11.0941', 'Plastimo Offshore 75 flush kompas hvid 1', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/2b829ec4cf8ce5fe416576d825b85eb8_w250_h250.jpg', 899.00, null, 1, ' '),
('PA-11.1260', 'Plastimo hætte for mini-contest 2 hvid -', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/1389346902_fotografenanderandpaaandvej_w250_h250.jpg', 79.00, null, 1, ' '),
('PA-11.1261', 'Plastimo hætte for mini-contest før 2009', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/311065cc186a272a86c8c2b80ca990d5_w250_h250.jpg', 209.00, null, 4, ' '),
('PA-11.1310', 'Plastimo Contest 101 kompas hvid', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/9dc2900937f88ac2915777bd1273207b_w250_h250.jpg', 1995.00, null, 1, ' '),
('PA-11.1350', 'Plastimo Olympic 135 kompas sort m/rød', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/3619e0d6e01bae52ece4516c5564d3a8_w250_h250.jpg', 2399.00, null, 1, ' '),
('PA-140L12', 'Ultraflex Låsetap for c2-c7-c8', 'https://www.palby.dk/pictures/resize.php/668x668/140L12_XL.jpg', 79.00, null, 8, ' '),
('PA-140L13', 'Ultraflex Låsetap c4-b14', 'https://www.palby.dk/pictures/resize.php/668x668/140L13_XL.jpg', 79.00, null, 5, ' '),
('PA-140L14', 'Ultraflex Kabelfæste for c2-c7-c8', 'https://www.palby.dk/pictures/resize.php/668x668/140L14_XL.jpg', 65.00, null, 2, ' '),
('PA-140L23', 'Ultraflex Kabelslæde dobb.kontrol', 'https://www.palby.dk/pictures/resize.php/668x668/140L23_XL.jpg', 1239.00, null, 1, ' '),
('PA-140L25', 'Ultraflex Gaffelstykke for c2-c7-c8', 'https://www.palby.dk/pictures/resize.php/668x668/140L25_XL.jpg', 159.00, null, 2, ' '),
('PA-1251401', 'Victron Solpanel polykrystal - Alu 30WP', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/d832f333e71f3cf0df9dc20bbdd747a1_w250_h250.jpg', 509.00, null, 1, ' '),
('PA-1251557', 'Victron Smart Battery Sense til MPPT lon', 'https://www.palby.dk/pictures/resize.php/668x668/1251557_XL.jpg', 529.00, null, 1, ''),
('PA-1251645', 'Victron BlueSolar PWM-LCD & USB 12/24V 5', 'https://www.palby.dk/pictures/resize.php/668x668/H1251645_XL.jpg', 469.00, null, 1, ' '),
('PA-1251406', 'Victron Solpanel polykrystal - Alu 115WP', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/d832f333e71f3cf0df9dc20bbdd747a1_w250_h250.jpg', 1419.00, null, 0, ' '),
('PA-1251410', 'Victron Solpanel polykrystal - Alu 175WP', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/d832f333e71f3cf0df9dc20bbdd747a1_w250_h250.jpg', 1869.00, null, 0, ' '),
('PA-1531000', 'Motorlås for motorer u/25hk', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/a3dcbbec4e7f075cef1899d911f85995_w250_h250.jpg', 649.00, null, 0, ' '),
('PA-1531250', 'Stazo smartlock', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/8acce17bffaa2324c3c64328eb5c8d4f_w250_h250.jpg', 1599.00, null, 2, ' '),
('PA-1051130', 'Låsekasse plast hvid stor', 'https://www.palby.dk/pictures/resize.php/668x668/1051130_XL.jpg', 85.00, null, 2, ''),
('PA-1531258', 'Stazo nutlock motorlås over 40hk', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/710c6f3e6adbac8db131ac968a363eef_w250_h250.jpg', 1329.00, null, 5, ' '),
('PA-1051711', 'Abus hængelås massiv messing vinyl besky', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/40514861849fc68c1db039cf7d5a4e62_w250_h250.jpg', 112.00, null, 0, ' ');

INSERT INTO Products (productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description)
VALUES
    ('PA-05.0100', 'Koøje 153 mm chrom', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/9d006f5d3b06ee880213f72b505abb7a_w250_h250.jpg', 869, NULL, 1, ' '),
    ('PA-04.1675', '1852 Mågeskræmmer - Uglen 40 cm.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/82dd6d6ef06af8b18575134494dc47d3_w250_h250.jpg', 199, NULL, 3, ' '),
    ('PA-1042296', 'Noa endeprop udvendig 25mm', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/e7a8a4a8c108b31abe0c645f627a33f7_w250_h250.jpg', 22, NULL, 2, ' '),
    ('PA-1043000', 'Hajfinner 25mm h=450 b=320 RF', 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTmOjtYIi34du6adE8fZyLqHPT8Q9EtR3tiFAdglTYUzSQwL8WCAIeVG8Z-B440C9MMfDZrsjaerKAX8nWOhg5sFTCgy0QetgJBIVlCahlwf7xITEbSW-xWpQynpzzXSjz_DWV0NiYnJg&usqp=CAc', 379, NULL, 5, ' '),
    ('PA-1050740', 'Gebo skylight 450x320mm', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsQpVuqTu8LegjK72L6LeMqJD505MpH4RwXRonrLJA1eK8eRp5HK36awZZptUkGZU6YX6hWZYc10nMcKOYg_m4NQXoqMaF1BS_nnzxO9XE4fQGcC4ue6xGmav9_ceGntKOKljFZT_rWg&usqp=CAc', 4799, NULL, 1, ' '),
    ('PA-130RC26363', 'Ronstan Ballslide intermediate car', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRJmTwiv2MW2VlIFwixrzxHIRZuaDnfZJQlJrDuvwlRiCZEWLSARB8FtzapotITMS7trnyopD2U7QG40kKRz_zQ6wufMpeqbOYkpMoUzIXIL8r9azBjzh6HCKwK5WUoCrwZwBiY3ag&usqp=CAc', 799, NULL, 1, ' '),
    ('PA-130RC63280', 'Ronstan Endestop til 32mm i-skinne', 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-UD-3TPTggsRgqpTPTXeJiu55dbS1cMCLXv9-5JXYjKFhQ7f4Hvn-2QWm_Pav51Wm3LN_fGvGANqFdpGj3TFwoHwMBuYw7N1vTFIYs9kFXFZr9TMC5DnCSnOs4SULJIu8UyPwPn8&usqp=CAc', 90, NULL, 7, ' '),
    ('PA-130RC72505', 'Ronstan Genuavogn serie 25 med bøjle og', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPEimea9_3yUWHa7PK5c_gkuLHwCd3VW7DEPiU18dt5OQsCxB8LcaJh_gRAbM6QUNwktLaInX22-oSOGia15LS0PwsNy2kOJAwFs0dmFkGiJS-DbDn6Kqt56pXB1hk&usqp=CAc', 412, NULL, 2, ' '),
    ('PA-130RC73243', 'Ronstan Spilerslæde med fjederstop 32mm', 'https://www.boatlab.dk/media/catalog/product/cache/47e4ebf565a39d8b91cc1d65ed8b6966/3/0/30_rc73243.jpg', 1158, NULL, 1, ' '),
    ('PA-130RC73280', 'Ronstan Endestop til 32mm t-skinne', 'https://anyparts.eu/59276-tm_large_default/ronstan-endestop-til-32mm-t-skinne.jpg', 19, NULL, 2, ' '),
    ('PA-1371287', 'Robline fald med øje blå Ø12mm 45m', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSp3aPEHK_3ooeJeWPupBJZJMO44Z0OmcAF83L6iY_-COmPUlOf0fKmgC00DeWZR2RQS3D7ZZWmJbYfkt0mVj8-NnDLAKi23U85G_cIlsBb9wW_P4p140_c67ba-1DUWxRE7q41Sg&usqp=CAc', 3499, NULL, 1, ' '),
    ('PA-137130147', 'Robline D-Splejser nål F15 Ø1,5mm nål to', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSpW6eojjPRBB8spNXsjbvfkA-A51JiTm4VaYSJ13MQpUV7ghYwvshaERDzlY7BuNu4a0P_btAI7l0N6BCZh328Kc_fQp_DCTq-Xq7ROhRKJ4p5BixwsJUiSG5CpONVdBbkifUTXK7vsg&usqp=CAc', 309, NULL, 1, ' '),
    ('PA-1371350', 'Robline fald med øje rød Ø8mm 30m', 'https://marinelageret.dk/media/cache/product_info_main_thumb/product-images/11/73/40/37.13501581077420.4133.jpg?1581077420', 1399, NULL, 2, ' '),
    ('PA-1379004', 'Robline Orion 500 Trim/skødeline 6mm Rød', 'https://www.palby.dk/pictures/resize.php/668x668/H1379004_XL.jpg', 1431, NULL, 5, ' '),
    ('PA-1379068', 'Robline Cormoran 12mm Navy 150m', 'https://www.palby.dk/pictures/resize.php/668x668/H1379065_XL.jpg', 2862, NULL, 4, ' '),
    ('PA-1431328', 'Smart tabs pr500 retractor kit', 'https://www.palby.dk/pictures/resize.php/668x668/1431328_XL.jpg', 599, NULL, 10, ' '),
    ('PA-1431920', 'Hydrofoil indtil 40 hk', 'https://www.palby.dk/pictures/resize.php/668x668/H1431920_XL.jpg', 179, NULL, 5, ' '),
    ('PA-1440430', 'Max Power Hovedafbryder elektrisk 12V', 'https://www.palby.dk/pictures/resizeLocal.php/270x230/blankimage.jpg', 3099, NULL, 3, ' '),
    ('PA-1500030', 'Oliekøler bowman dc120 1/2" olie, vand 2', 'https://www.palby.dk/pictures/resize.php/668x668/H1500000_XL.jpg', 2745, NULL, 7, ' '),
    ('PA-1500430', 'Endestykke 3251-l-70/22mm', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcScCf-JYTWpNCEhZUs7mDVYMEjHJGbJPWj4jse445P4k-oKuYfXij4tPYOnGPPUtdzHB_ynudsaiFFktaDoQHvtY493doydQ5R0HNfM_YaXMmamFMIDn7TzuEDAUafi3uHyjTax3cI&usqp=CAc', 379, NULL, 5, ' '),
    ('PA-1515101', 'Impeller - jabsco, johnson, nanni', 'https://www.palby.dk/pictures/resize.php/346x346/1515100_XL.jpg', 145, NULL, 3, ' '),
    ('PA-1530821', 'Benzinslange gummi Ø6,0mm 3meter rulle', 'https://nordjysk-marine.dk/cdn/shop/files/H1530821_XL_adc1a609-2511-46f4-929d-1a603826048f.jpg?v=1700274621&width=600', 145, NULL, 4, ' '),
    ('PA-1540300', 'Spændebånd plast 11,1 - 12,9mm sort - 6m', 'https://nordjysk-marine.dk/cdn/shop/files/H1540300_XL.jpg?v=1700274739&width=600', 18, NULL, 1, ' '),
    ('PA-1540756', 'Klar pvc slange food quality 5mm, 3m', 'https://marinexperten.dk/wp-content/uploads/2022/08/1540756.jpg', 18, NULL, 1, ' '),
    ('PA-1541151', 'Spiralsugeslange 20mm sort 3m', 'https://marinexperten.dk/wp-content/uploads/2022/08/1541151.jpg', 75, NULL, 3, ' '),
    ('PA-19.4701', '1852 El-påhængsmotor 3.0 M/Batteri 20A -', 'https://www.moory.dk/wp-content/uploads/sites/2/2023/11/batmotor-el-1852-marine-30-4-hk-kort-rigg-1.jpg', 10999, NULL, 1, ' '),
    ('PA-19.4703', 'Ekstra batteri til 1852 el-påhængsmotor', 'https://www.boatlab.dk/media/catalog/product/cache/47e4ebf565a39d8b91cc1d65ed8b6966/1/1/1194705.jpg', 5599, NULL, 3, ' '),
    ('PA-1194702', '1852 el-påhængsmotor 3.0 m/batteri 30ah,', 'https://webserver.flak.no/vbilder/nautec/vbilder/1194702_XL.jpg', 14399, NULL, 2, ' '),
    ('PA-1194704', 'Ekstra lader til 1852 el-påhængsmotor 3.', 'https://www.boatlab.dk/media/catalog/product/cache/47e4ebf565a39d8b91cc1d65ed8b6966/c/c/cc807a85-afbf-4af4-9015-384f3244133d.jpg', 1399, NULL, 6, ' '),
    ('PA-1194705', 'Ekstra batteri til 1852 el-påhængsmotor', 'https://www.boatlab.dk/media/catalog/product/cache/47e4ebf565a39d8b91cc1d65ed8b6966/1/1/1194705.jpg', 8399, NULL, 3, ' '),
        ('PA-1280050', 'Quick Varmeelement 220V-800W 5/4"', 'https://anyparts.eu/58845-tm_large_default/quick-varmeelement-220v-800w-5-4.jpg', 919, NULL, 6, ' '),
    ('PA-1280080', 'Quick Sigmar mixer-termostat', 'https://www.palby.dk/pictures/resize.php/668x668/1280080_XL.jpg', 719, NULL, 1, ' '),
    ('PA-1280259', 'Isotemp 20 l varmtvandsbeholder slim med', 'https://cdn.watski.com/tr:h-500,dpr-1/img/original_jpg/f19cd470-a035-11eb-91e8-8bff9ab085ed.jpg', 6119, NULL, 3, ' '),
    ('PA-1280288', 'Isotemp varmelegeme Basic 230V 1200W', 'https://www.boatlab.dk/media/catalog/product/cache/47e4ebf565a39d8b91cc1d65ed8b6966/e/0/e0e125e5-3ffa-4481-8bce-b7753d8fbba9_1.jpg', 519, NULL, 5, ' '),
    ('PA-10.0368', 'Webasto luftlyddæmper ø90 mm', 'https://cdn.watski.com/tr:h-500,dpr-1/img/original_jpg/ff0bb443-3eb0-46d0-8ced-5a128fe0b59e.jpg', 1059, NULL, 1, ' '),
    ('PA-1041610', 'Låseoverfald vridbar 64x24mm RF', 'https://anyparts.eu/50531-tm_large_default/laseoverfald-vridbar-64x24mm-rf.jpg', 69, NULL, 7, ' '),
    ('PA-1001602', 'Skruestativ med A4 skruer, bolte, rigdel', 'https://www.nardocar.dk/images/produkter/pm/1001602_xl.jpg', 50199, NULL, 1, ' '),
    ('PA-1041600', '1852 Låseoverfald fast 70x25mm. AISI 304', 'https://anyparts.eu/50530-tm_large_default/1852-laseoverfald-fast-70x25mm-aisi-304-rustfrit-stal.jpg', 45, NULL, 3, ' '),
    ('PA-1041616', 'Låseoverfald vridbar 75x25mm RF', 'https://nordjysk-marine.dk/cdn/shop/files/1041610_XL.jpg?v=1700258020&width=600', 69, NULL, 7, ' '),
    ('PA-1041765', 'Kalechevrider 6mm pose med 10stk', 'https://marinelageret.dk/media/cache/product_info_main_thumb/product-images/16/40/1/04.17651544085093.4479.jpg?1544085093', 155, NULL, 15, ' '),
        ('PA-1044001', 'Kinetic Beaster CT 6fod fiskestanfg med', 'https://staticcdn.watski.com/img/original_jpg/8672bed0-4b70-11ec-a4f3-0b11fe4786ef.jpg', 1329, NULL, 2, ' '),
    ('PA-1044055', 'Kinetic Cyber Braid 4, 150m 0,14mm/14,8k', 'https://sw1367.sfstatic.io/upload_dir/shop/_thumbs/kinetic-cyber-braid-x4-dusty-green-150m.w610.h610.fill.jpg', 66, NULL, 5, ' '),
    ('PA-1044062', 'Kinetic Super Mono 0,35mm 440m 8,3kg', 'https://www.boatlab.dk/media/catalog/product/cache/47e4ebf565a39d8b91cc1d65ed8b6966/h/v/hvk53_3583_1.jpg', 47, NULL, 4, ' '),
    ('PA-1044150', 'Kinetic Kyst/Å 18g 5stk Jebo Sild', 'https://cdn.watski.com/tr:h-500,dpr-1/img/original_jpg/cebfa640-5cc2-11ec-b4f2-9da76bce963c.jpg', 85, NULL, 3, ' '),
    ('PA-1044181', 'Kinetic Sabiki Plaice Leader/Spoon 40g R', 'https://nordjysk-marine.dk/cdn/shop/files/H1044181_XL.jpg?v=1700267309&width=600', 39, NULL, 10, ' ');

INSERT INTO Products (productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description)
VALUES
('PA-04.0581', 'Dækspåfyldning water 38mm m/udl sort pla', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/0bd16a90d17a826fdac550f33ec51bc9_w250_h250.jpg', 249, NULL, 0, ' '),
('PA-04.0587', 'Dækspåfyldning water 38mm m/udl rustfri', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/8e236a2a1928f937fa098a69104ec028_w250_h250.jpg', 529, NULL, 0, ''),
('PA-04.1735', '1852 bådpresenning støtte abs plast læng', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/ee80d2dd30f2a45231ddb2d9d9f89344_w250_h250.jpg', 99, NULL, 12, ''),
('PA-04.1746', 'Støtte F/Presenning 75-120 cm.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/33f3e3710627e54e8e0c554d6c8e0278_w250_h250.jpg', 189, NULL, 0, ''),
('PA-04.1870-1', 'Kalecheknap Krom 16,5 mm.', 'https://www.palby.dk/pictures/resize.php/668x668/1041870_XL.jpg', 14, NULL, 7, ''),
('PA-1010221', 'Lofrans vedligeholdelsekit til X2/Projec', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/b11a32f83a4dfa77215aab7306b277c7_w250_h250.jpg', 769, NULL, 1, ''),
('PA-1010705', 'Ankerkæde galvaniseret DIN 766 6mm 50m', 'https://www.palby.dk/pictures/resize.php/668x668/H1010701_XL.jpg', 2099, NULL, 1, ''),
('PA-1010953', '1852 Ankerrulle vipbar AISI 316 L-415mm', 'https://www.palby.dk/pictures/resize.php/668x668/H1010953_XL.jpg', 1899, NULL, 2, ''),
('PA-1011130', 'Ankerrulle til søgelænder Ø22-25mm', 'https://www.palby.dk/pictures/resize.php/668x668/1011130_XL.jpg', 149, NULL, 3, ''),
('PA-1011120', 'Hjul for ankerrulle 70x62mm', 'https://www.palby.dk/pictures/resize.php/668x668/H1011100_XL.jpg', 209, NULL, 2, ''),
('PA-1283254', '1852 køleboks 55L med kompressor, 2-delt', 'https://www.palby.dk/pictures/resize.php/668x668/1283254_XL.jpg', 3999, NULL, 0, ''),
('PA-1283258', '1852 Køleskab CR 50 med fryser, køl 34L/', 'https://webserver.flak.no/vbilder/nautec/vbilder/1283258_XL.jpg', 4599, NULL, 3, ''),
('PA-1283262', '1852 Køleskabs ramme til CR65', 'https://www.palby.dk/pictures/resize.php/668x668/1283262_XL.jpg', 579, NULL, 0, ''),
('PA-1283259', '1852 køleskabs ramme til CR50', 'https://www.palby.dk/pictures/resize.php/668x668/1283259_XL.jpg', 549, NULL, 0, ''),
('PA-1851771', 'Strahl Vinglas Polycarbonat 384 ml. 4stk', 'https://www.palby.dk/pictures/resize.php/668x668/1851771_XL.jpg', 459, NULL, 1, ''),
('PA-15.2450', 'Gummipøs kraftig m/galv.håndt.', 'https://bue-net.dk/wp-content/uploads/nc/airboss/P15.2450_2.jpg', 159, NULL, 1, ''),
('PA-15.3622', 'Dobbelt holder hvid med sugekop', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/91f879d5be0ca5cd899e234c264d805d_w250_h250.jpg', 54, NULL, 0, ''),
('PA-1610105', 'Slingredug 30 x 120cm hvid', 'https://www.palby.dk/pictures/resize.php/668x668/1610105_XL.jpg', 20, NULL, 0, ''),
('PA-1610895', 'Gisatex antislide marine floor teak 1,5m', 'https://www.palby.dk/pictures/resize.php/668x668/1610895_XL.jpg', 4999, NULL, 2, ''),
('PA-63.2211', 'International Toplac 750 ml.', 'https://www.palby.dk/pictures/resize.php/668x668/H1632212_XL.jpg', 399, NULL, 16, ''),
('PA-64.82616', 'Star Brite Rubbing Compound 397 g.', 'https://www.palby.dk/pictures/resize.php/668x668/16482616_XL.jpg', 159, NULL, 4, ''),
('PA-64.96516', 'Star Brite Tea Tree Luftrenser 500 ml.', 'https://www.palby.dk/pictures/resize.php/668x668/16496508_XL.jpg', 229, NULL, 2, ''),
('PA-67.0821', 'PP Elastic Super Spartel 130 ml.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/0ec0dcd0bea7607ac50994636ea7863f_w250_h250.jpg', 99, NULL, 6, ''),
('PA-67.1051', 'PP Læk-Tæt 180 ml.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/67.1051_w80_h80.jpg', 124, NULL, 2, ''),
('PA-35.39972', 'Gill HT23 Softshell Elefanthue', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/b78158be031ee11cfb49aa8b66fb44a2_w250_h250.jpg', 199, NULL, 1, ''),
('PA-35.4063', 'Mt008 harness værktøj gill', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/35.4063_w80_h80.jpg', 199, NULL, 3, ''),
('PA-35.4360-9', 'Gill Flydene Brillesnor', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/324b434ce910e12244eb7c0d5b9271de_w250_h250.jpg', 50, NULL, 10, ''),
('PA-35.4219', 'L063 TOLIET TASKE GILL SORT', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/f5e87335554d2c05cb6590ef8eaae355_w250_h250.jpg', 359, NULL, 3, ''),
('PA-35.4413', 'Gill 9674 Marker Solbriller Sort', 'https://shop15769.sfstatic.io/upload_dir/shop/_thumbs/Marker-Solbrille-sort-9674.w610.h610.fill.jpg', 649, NULL, 1, ''),
('PA-16.0534', 'MPS Kystnært Nødblussæt', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/bc003092e7c4c7abfc5ee76264d31e80_w250_h250.jpg', 469, NULL, 4, ''),
('PA-16.0721', 'Plastimo Rescue sling hvid m/40m line', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/e0360f35a099d787cf6cd3e35bc638af_w250_h250.jpg', 1199, NULL, 0, '  '),
('PA-1580690', 'Gloria P 2 GM ildslukker 13A 89B C Sveri', 'https://www.boatlab.dk/media/catalog/product/cache/6d31bac52d36df9eb3e9652674eed3c3/0/8/08.0206.jpg', 719, NULL, 0, '  '),
('PA-1580691', 'Dafo Core ildslukker 13A 70B C Sverige 2', 'https://www.sailgear.dk/wp-content/uploads/2023/03/1080216_XL-300x300.jpg', 359, NULL, 0, '  '),
('PA-16.1077', 'Patron 60 gr. for dan-buoy', '1389346902_fotografenanderandpaaandvej_w250_h250.jpg (250×250) (baadservice.dk)', 210, NULL, 0, '  '),
('PA-1270130', 'Løs nøgle til 27.0120', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/fe45563ef9588e41e45f6e14968b22a9_w250_h250.jpg', 25, NULL, 8, '  '),
('PA-1270172', 'Dobbelt USB udtag 1 & 2,1Amp IP65', 'https://www.palby.dk/pictures/resize.php/668x668/1270172_XL.jpg', 115, NULL, 4, '  '),
('PA-1270189', '1852 påbygnings dobbelt USB udtag 5V & c', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/74713adec1d71e562ea13879c6e2a166_w250_h250.jpg', 165, NULL, 3, '  '),
('PA-1270085', 'Vandtæt sikrings holder 30Amp med lys', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/dea9b058e3efd71f21ece1e42e5eb529_w250_h250.jpg', 59, NULL, 6, '  '),
('PA-1270074', 'Sikringsholder 5Amp til lodrette elpanel', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/093d38f017087476fe3d1c9408ced063_w250_h250.jpg', 42, NULL, 9, '  '),
('PA-1270073', 'Kontakt med lys for elpaneler 126.0060-8', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/4180ae33fef41bb616f388a34431ec3d_w250_h250.jpg', 42, NULL, 6, '  '),
('PA-1270083', 'Strømpanel med cigaretstik, 3 kon.', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/4c38251426bc67473ab2cbd64ec1a14d_w250_h250.jpg', 145, NULL, 1, ' '),
('PA-1270104', 'Batteriomskifter 360Amp med lås', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/638248c8a4d16b984cb3a32a0b8e68e1_w250_h250.jpg', 429, NULL, 0, ' '),
('PA-1119977', 'C-Map Y205 Discover, Danmark "kun ved kø', 'https://sw64394.sfstatic.io/upload_dir/pics/integration/hellers/_thumbs/pa1119977-c-map-y205-discover-danmark-kun-ved-kb-af-plotter-6a943412-1c13-11ee-8feb-f6b20bdf8488.w1200.jpeg', 1299, NULL, 2, ' '),
('PA-1119988', 'Navionics+ Large Danmark EU645L SD/MSD', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/de5568d93c8ae1ce2df09568ad557a68_w250_h250.jpg', 2099, NULL, 1, ' '),
('PA-1240106', 'DHR LED insert til DHR150 10- 32V 10W 20', 'https://www.marineudstyr.dk/64832-warehouse_large_default/dhr-led-insert-til-dhr150-10-32v-10w-200000-cd.jpg', 3499, NULL, 0, ' '),
('PA-1800350', 'Nøglering kork', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/d81a642a2e715e109f3b8414d5d664a5_w250_h250.jpg', 55, NULL, 0, ' '),
('PA-1810430', 'Messing knag lille', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/8e7ea2bb9d926c20e5be9fdc61eade3d_w250_h250.jpg', 97, NULL, 1, ' '),
('PA-1810790', 'Foresti Væglampe m. gitter/skærm 2060', 'https://www.baadservice.dk/components/com_redshop/assets/images/product/thumb/d8e1e4f9ebbf70ff600485ea19704434_w250_h250.jpg', 1429, NULL, 0, ' '),
('PA-1820090', 'DHR Cabin lampe 8209 olie', 'https://www.palby.dk/pictures/resize.php/668x668/1820090_XL.jpg', 1839, NULL, 0, ' ');




INSERT INTO Categories (categoryName)
VALUES
  ('Riggerarbejde'),
  ('Gummibåde og Vandsport'),
  ('Lys og Lanterner'),
  ('Zink'),
  ('Pantry, komfur og køleskab'),
  ('Toilet'),
  ('Navigationsustyr'),
  ('Styring og tilbehør'),
  ('Sol og vindenergi'),
  ('Tyvesikring og lås');

INSERT INTO Categories (categoryName) VALUES
('Bådudrustning alment'),
('Rig & Mast'),
('Tovværk og fortøjning'),
('Motordele & tilbehør'),
('Påhængsmotorer'),
('Bådvarme'),
('Skruer, bolte, og beslag'),
('Pumper, filtrings & slanger'),
('Fiskeudstyr');

INSERT INTO Categories (categoryName) VALUES
  ('Udstyr på og omkring dækket'),
  ('Fortøjning og ankring'),
  ('Køl og madlavning'),
  ('Komfort ombord'),
  ('Maling og klargøring'),
  ('Sejlertøj'),
  ('Sikkerhedsudstyr'),
  ('Elforsyning'),
  ('Elektronik ombord'),
  ('Gaveartikler og bøger');


INSERT INTO ProductCategory (productId, categoryId)
VALUES
  (1, 1),  -- PA-1324280 => Riggerarbejde
  (2, 1),  -- PA-1324480 => Riggerarbejde
  (3, 1),  -- PA-1325330 => Riggerarbejde
  (4, 1),  -- PA-1326692 => Riggerarbejde
  (5, 1),  -- PA-1339550 => Riggerarbejde
  (6, 1),  -- PA-1339552 => Riggerarbejde
  (7, 2),  -- PA-15.0900 => Gummibåde og Vandsport
  (8, 2),  -- PA-1041828 => Gummibåde og Vandsport
  (9, 2),  -- PA-1041836 => Gummibåde og Vandsport
  (10, 2), -- PA-1042015 => Gummibåde og Vandsport
  (11, 2), -- PA-1042052 => Gummibåde og Vandsport
  (12, 3), -- PA-11.1570 => Lys og Lanterner
  (13, 3), -- PA-1114880 => Lys og Lanterner
  (14, 3), -- PA-1151784 => Lys og Lanterner
  (15, 3), -- PA-1151785 => Lys og Lanterner
  (16, 3), -- PA-1171100 => Lys og Lanterner
  (17, 4), -- PA-14.1452 => Zink
  (18, 4), -- PA-14.1453 => Zink
  (19, 4), -- PA-14.5000 => Zink
  (20, 4), -- PA-14.5002 => Zink
  (21, 4), -- PA-14.1476 => Zink
  (22, 5), -- PA-18514001 => Pantry, komfur og køleskab
  (23, 5), -- PA-18514002 => Pantry, komfur og køleskab
  (24, 5), -- PA-18514003 => Pantry, komfur og køleskab
  (25, 5), -- PA-18514004 => Pantry, komfur og køleskab
  (26, 5), -- PA-18514007 => Pantry, komfur og køleskab
  (27, 6), -- PA-07.0820 => Toilet
  (28, 6), -- PA-07.0920 => Toilet
  (29, 6), -- PA-07.2064 => Toilet
  (30, 6), -- PA-07.0090 => Toilet
  (31, 6), -- PA-08.0510 => Toilet
  (32, 7), -- PA-11.0941 => Navigationsustyr
  (33, 7), -- PA-11.1260 => Navigationsustyr
  (34, 7), -- PA-11.1261 => Navigationsustyr
  (35, 7), -- PA-11.1310 => Navigationsustyr
  (36, 7), -- PA-11.1350 => Navigationsustyr
  (37, 8), -- PA-140L12 => Styring og tilbehør
  (38, 8), -- PA-140L13 => Styring og tilbehør
  (39, 8), -- PA-140L14 => Styring og tilbehør
  (40, 8), -- PA-140L23 => Styring og tilbehør
  (41, 8), -- PA-140L25 => Styring og tilbehør
  (42, 9), -- PA-1251401 => Sol og vindenergi
  (43, 9), -- PA-1251557 => Sol og vindenergi
  (44, 9), -- PA-1251645 => Sol og vindenergi
  (45, 9), -- PA-1251406 => Sol og vindenergi
  (46, 9), -- PA-1251410 => Sol og vindenergi
  (47, 10),-- PA-1531000 => Tyvesikring og lås
  (48, 10),-- PA-1531250 => Tyvesikring og lås
  (49, 10),-- PA-1051130 => Tyvesikring og lås
  (50, 10),-- PA-1531258 => Tyvesikring og lås
  (51, 10);-- PA-1051711 => Tyvesikring og lås

INSERT INTO ProductCategory (productId, categoryId) VALUES
(52, 11),  -- PA-05.0100 => Bådudrustning alment
(53, 11),  -- PA-04.1675 => Bådudrustning alment
(54, 11),  -- PA-1042296 => Bådudrustning alment
(55, 11),  -- PA-1043000 => Bådudrustning alment
(56, 11),  -- PA-1050740 => Bådudrustning alment
(57, 12),  -- PA-130RC26363 => Rig & Mast
(58, 12),  -- PA-130RC63280 => Rig & Mast
(59, 12),  -- PA-130RC72505 => Rig & Mast
(60, 12),  -- PA-130RC73243 => Rig & Mast
(61, 12),  -- PA-130RC73280 => Rig & Mast
(62, 13),  -- PA-1371287 => Tovværk og fortøjning
(63, 13),  -- PA-137130147 => Tovværk og fortøjning
(64, 13),  -- PA-1371350 => Tovværk og fortøjning
(65, 13),  -- PA-1379004 => Tovværk og fortøjning
(66, 13),  -- PA-1379068 => Tovværk og fortøjning
(67, 14),  -- PA-1431328 => Motordele & tilbehør
(68, 14),  -- PA-1431920 => Motordele & tilbehør
(69, 14),  -- PA-1440430 => Motordele & tilbehør
(70, 14),  -- PA-1500030 => Motordele & tilbehør
(71, 14),  -- PA-1500430 => Motordele & tilbehør
(72, 18),  -- PA-1515101 => Pumper, filtrings & slanger
(73, 18),  -- PA-1530821 => Pumper, filtrings & slanger
(74, 18),  -- PA-1540300 => Pumper, filtrings & slanger
(75, 18),  -- PA-1540756 => Pumper, filtrings & slanger
(76, 18),  -- PA-1541151 => Pumper, filtrings & slanger
(77, 15),  -- PA-19.4701 => Påhængsmotorer
(78, 15),  -- PA-19.4703 => Påhængsmotorer
(79, 15),  -- PA-1194702 => Påhængsmotorer
(80, 15),  -- PA-1194704 => Påhængsmotorer
(81, 15),  -- PA-1194705 => Påhængsmotorer
(82, 16),  -- PA-1280050 => Bådvarme
(83, 16),  -- PA-1280080 => Bådvarme
(84, 16),  -- PA-1280259 => Bådvarme
(85, 16),  -- PA-1280288 => Bådvarme
(86, 16),  -- PA-10.0368 => Bådvarme
(87, 17),  -- PA-1041610 => Skruer, bolte, og beslag
(88, 17),  -- PA-1001602 => Skruer, bolte, og beslag
(89, 17),  -- PA-1041600 => Skruer, bolte, og beslag
(90, 17),  -- PA-1041616 => Skruer, bolte, og beslag
(91, 17),-- PA-1041765 => Skruer, bolte, og beslag
(92, 19),  -- PA-1044001 => Fiskeudstyr
(93, 19),  -- PA-1044055 => Fiskeudstyr
(94, 19),  -- PA-1044062 => Fiskeudstyr
(95, 19),  -- PA-1044150 => Fiskeudstyr
(96, 19);  -- PA-1044181 => Fiskeudstyr

INSERT INTO ProductCategory (productId, categoryId) VALUES
  (97, 20),   -- PA-04.0581 => Udstyr på og omkring dækket
  (98, 20),   -- PA-04.0587 => Udstyr på og omkring dækket
  (99, 20),   -- PA-04.1735 => Udstyr på og omkring dækket
  (100, 20),  -- PA-04.1746 => Udstyr på og omkring dækket
  (101, 20),  -- PA-04.1870-1 => Udstyr på og omkring dækket
  (102, 21),  -- PA-1010221 => Fortøjning og ankring
  (103, 21),  -- PA-1010705 => Fortøjning og ankring
  (104, 21),  -- PA-1010953 => Fortøjning og ankring
  (105, 21),  -- PA-1011130 => Fortøjning og ankring
  (106, 21),  -- PA-1011120 => Fortøjning og ankring
  (107, 22),  -- PA-1283254 => Køl og madlavning
  (108, 22),  -- PA-1283258 => Køl og madlavning
  (109, 22),  -- PA-1283262 => Køl og madlavning
  (110, 22),  -- PA-1283259 => Køl og madlavning
  (111, 23),  -- PA-1851771 => Komfort ombord
  (112, 23),  -- PA-15.2450 => Komfort ombord
  (113, 23),  -- PA-15.3622 => Komfort ombord
  (114, 23),  -- PA-1610105 => Komfort ombord
  (115, 23),  -- PA-1610895 => Komfort ombord
  (116, 24),  -- PA-63.2211 => Maling og klargøring
  (117, 24),  -- PA-64.82616 => Maling og klargøring
  (118, 24),  -- PA-64.96516 => Maling og klargøring
  (119, 24),  -- PA-67.0821 => Maling og klargøring
  (120, 24),  -- PA-67.1051 => Maling og klargøring
  (121, 25),  -- PA-35.39972 => Sejlertøj
  (122, 25),  -- PA-35.4063 => Sejlertøj
  (123, 25),  -- PA-35.4360-9 => Sejlertøj
  (124, 25),  -- PA-35.4219 => Sejlertøj
  (125, 25),  -- PA-35.4413 => Sejlertøj
  (126, 26),  -- PA-16.0534 => Sikkerhedsudstyr
  (127, 26),  -- PA-16.0721 => Sikkerhedsudstyr
  (128, 26),  -- PA-1580690 => Sikkerhedsudstyr
  (129, 26),  -- PA-1580691 => Sikkerhedsudstyr
  (130, 26),  -- PA-16.1077 => Sikkerhedsudstyr
  (131, 27),  -- PA-1270130 => Elforsyning
  (132, 27),  -- PA-1270172 => Elforsyning
  (133, 27),  -- PA-1270189 => Elforsyning
  (134, 27),  -- PA-1270085 => Elforsyning
  (135, 27),  -- PA-1270074 => Elforsyning
  (136, 28),  -- PA-1270073 => Elektronik ombord
  (137, 28),  -- PA-1270083 => Elektronik ombord
  (138, 28),  -- PA-1270104 => Elektronik ombord
  (139, 28),  -- PA-1119977 => Elektronik ombord
  (140, 28),  -- PA-1119988 => Elektronik ombord
  (141, 29), -- PA-1240106 => Gaveartikler og bøger
  (142, 29), -- PA-1800350 => Gaveartikler og bøger
  (143, 29), -- PA-1810430 => Gaveartikler og bøger
  (144, 29), -- PA-1810790 => Gaveartikler og bøger
  (145, 29); -- PA-1820090 => Gaveartikler og bøger


INSERT INTO Colors (productId, colorName)
VALUES
  (1, 'Grå'),
  (2, 'Grå'),
  (3, 'Grå'),
  (4, 'Grå'),
  (5, 'Grå'),
  (6, 'Grå'),
  (7, 'Orange'),
  (8, 'Grå'),
  (9, 'Grå'),
  (10, 'Grå'),
  (11, 'Sort'),
  (12, 'Rød'),
  (13, 'Sort'),
  (14, 'Hvid'),
  (15, 'Hvid'),
  (16, 'Sort'),
  (17, 'Grå'),
  (18, 'Grå'),
  (19, 'Grå'),
  (20, 'Grå'),
  (21, 'Grå'),
  (22, 'Blå'),
  (23, 'Blå'),
  (24, 'Blå'),
  (25, 'Blå'),
  (26, 'Blå'),
  (27, 'unknown color'),
  (28, 'unknown color'),
  (29, 'Hvid'),
  (30, 'Hvid'),
  (31, 'Blå'),
  (32, 'Hvid'),
  (33, 'Hvid'),
  (34, 'Hvid'),
  (35, 'Hvid'),
  (36, 'Rød'),
  (36, 'Sort'),
  (37, 'Bronze'),
  (38, 'Bronze'),
  (39, 'Bronze'),
  (40, 'Grå'),
  (41, 'Grå'),
  (42, 'Sort'),
  (43, 'Blå'),
  (44, 'Blå'),
  (45, 'Sort'),
  (46, 'Sort'),
  (47, 'Sort'),
  (48, 'Grå'),
  (49, 'Hvid'),
  (50, 'Grå'),
  (51, 'Sort');

INSERT INTO Colors (productId, colorName)
VALUES
  (52, 'Chrome'),
  (53, 'Brun'),
  (54, 'Sort'),
  (55, 'Sølv'),
  (56, 'Sort'),
  (57, 'Sort'),
  (58, 'Sort'),
  (59, 'Sort'),
  (60, 'Sølv'),
  (61, 'Sort'),
  (62, 'Blå'),
  (63, 'Grå'),
  (64, 'Rød'),
  (65, 'Rød'),
  (66, 'Navy'),
  (67, 'Sølv'),
  (68, 'Sort'),
  (69, 'Sort'),
  (70, 'Sølv'),
  (71, 'Sort'),
  (72, 'Sort'),
  (73, 'Sort'),
  (74, 'Sort'),
  (75, 'Grå'),
  (76, 'Sort'),
  (77, 'Sølv'),
  (78, 'Sølv'),
  (79, 'Sølv'),
  (80, 'Sølv'),
  (81, 'Sort'),
  (82, 'Sølv'),
  (83, 'Sølv'),
  (84, 'Sølv'),
  (85, 'Sort'),
  (86, 'Sort'),
  (87, 'Sølv'),
  (88, 'Grå'),
  (89, 'Sølv'),
  (90, 'Sølv'),
  (91, 'Unknown Color'),
  (92, 'Sort'),
  (93, 'Grøn'),
  (94, 'Grå'),
  (95, 'Unknown Color'),
  (96, 'Blå');

INSERT INTO Colors (productId, colorName)
VALUES
  (97, 'Sort'),
  (98, 'Sort'),
  (99, 'Sort'),
  (100, 'Grå'),
  (101, 'Grå'),
  (102, 'Unknown Color'),
  (103, 'Grå'),
  (104, 'Grå'),
  (105, 'Hvid'),
  (106, 'Unknown Color'),
  (107, 'Unknown Color'),
  (108, 'Unknown Color'),
  (109, 'Unknown Color'),
  (110, 'Unknown Color'),
  (111, 'Unknown Color'),
  (112, 'Unknown Color'),
  (113, 'Hvid'),
  (114, 'Unknown Color'),
  (115, 'Sort'),
  (116, 'Unknown Color'),
  (117, 'Unknown Color'),
  (118, 'Unknown Color'),
  (119, 'Unknown Color'),
  (120, 'Sort'),
  (121, 'Sort'),
  (122, 'Rødt'),
  (123, 'Hvid'),
  (124, 'Unknown Color'),
  (125, 'Rød'),
  (126, 'Unknown Color'),
  (127, 'Unknown Color'),
  (128, 'Unknown Color'),
  (129, 'Unknown Color'),
  (130, 'Unknown Color'),
  (131, 'Unknown Color'),
  (132, 'Unknown Color'),
  (133, 'Unknown Color'),
  (134, 'Unknown Color'),
  (135, 'Unknown Color'),
  (136, 'Unknown Color'),
  (137, 'Unknown Color'),
  (138, 'Unknown Color'),
  (139, 'Unknown Color'),
  (140, 'Unknown Color'),
  (141, 'Unknown Color'),
  (142, 'Unknown Color'),
  (143, 'Unknown Color'),
  (144, 'Unknown Color'),
  (145, 'Unknown Color');

INSERT INTO Colors (productId, colorName)
VALUES
(98, 'Grå'),
(105,'Grå'),
(122, 'Sølv'),
(123, 'Sort'),
(123, 'Rød');