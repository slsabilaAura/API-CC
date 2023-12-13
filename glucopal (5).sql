use glucopal;

CREATE TABLE `food_category` (
  `id` int(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ;

INSERT INTO `food_category` (`id`, `category`) VALUES
(1, 'Baked Product'),
(2, 'Beverages'),
(3, 'Dairy Foods');

CREATE TABLE `gi_food` (
  `id` int(255) NOT NULL,
  `id_category` int(255) NOT NULL,
  `food` varchar(255) NOT NULL,
  `GI` int(255) NOT NULL
) ;

INSERT INTO `gi_food` (`id`, `id_category`, `food`, `GI`) VALUES
(1, 1, 'Baguette (white)', 95),
(2, 1, 'Baguette (whole grain)', 73),
(3, 1, 'Bagel (wheat)', 70),
(4, 1, 'Biscuit', 70),
(5, 1, 'Biscotti (dry cookies)', 70),
(6, 1, 'Pancakes', 66),
(7, 1, 'Buckwheat pancakes', 40),
(8, 1, 'Brioche (bun)', 70),
(9, 1, 'Bagels', 70),
(10, 1, 'Hamburger bun', 61),
(11, 1, 'Waffles', 75),
(12, 1, 'Crackers', 80),
(13, 1, 'Croissant', 70),
(14, 1, 'Flatbread', 69),
(15, 1, 'Shortbread Cookies (Integral Flour, Sugar Free)', 40),
(16, 1, 'Shortbread', 60),
(17, 1, 'Cookies (whole grain flour, sugar free)', 50),
(18, 1, 'Cookies (pastries)', 70),
(19, 1, 'Butter cookies (flour, butter, sugar)', 55),
(20, 1, 'Oatmeal cookies', 55),
(21, 1, 'Multi Grain Cookies', 51),
(22, 1, 'Banana pie', 47),
(23, 1, 'Pita', 57),
(24, 1, 'Pizza', 60),
(25, 1, 'Donuts', 75),
(26, 1, 'Bakery products (wheat)', 90),
(27, 1, 'Wheat bread', 70),
(28, 1, 'Rye bread', 65),
(29, 1, 'Rice waffles', 64),
(30, 1, 'Rice biscuits', 85),
(31, 1, 'Rice cake', 85),
(32, 1, 'Straw', 60),
(33, 1, 'Rye crackers', 64),
(34, 1, 'Sandwich bread, white', 75),
(35, 1, 'French baguette made from wheat flour', 70),
(36, 1, 'Bread (oatmeal)', 47),
(37, 1, 'White bread ñbaguetteî', 70),
(38, 1, 'Gluten free white bread', 90),
(39, 1, 'Buckwheat bread', 50),
(40, 1, 'Brown yeast bread', 65),
(41, 1, 'White flour bread', 90),
(42, 1, 'Wholemeal bread', 65),
(43, 1, 'Germinated bread', 35),
(44, 1, 'Wholemeal bread', 40),
(45, 1, 'Milk bread', 60),
(46, 1, 'Pumpernickel Bread', 45),
(47, 1, 'Rice Bread', 70),
(48, 1, 'Bran bread', 65),
(49, 2, 'Vegetable juice', 15),
(50, 2, 'Coconut water', 35),
(51, 2, 'Milk (skimmed)', 32),
(52, 2, 'Milk (whole)', 27),
(53, 2, 'Soy milk', 34),
(54, 2, 'Orange juice', 50),
(55, 2, 'Apple juice', 41),
(56, 2, 'Grape juice', 46),
(57, 2, 'Cranberry juice', 52),
(58, 2, 'Cola', 63),
(59, 2, 'Lemonade', 54),
(60, 2, 'Sports drink', 78),
(61, 2, 'Beer', 70),
(62, 2, 'Red wine', 25),
(63, 2, 'White wine', 43),
(64, 2, 'Champagne', 76),
(65, 3, 'Vanilla ice cream (regular, with sugar)', 60),
(66, 3, 'Yogurt', 35),
(67, 3, 'Yogurt 1.5% natural', 35),
(68, 3, 'Sweet yogurt', 52),
(69, 3, 'Soy yogurt (natural)', 20),
(70, 3, 'Fruit yogurt', 52),
(71, 3, 'Fat-free yogurt', 33),
(72, 3, 'Kefir (1% fat)', 31),
(73, 3, 'Kefir (regular)', 36),
(74, 3, 'Kefir low-fat', 25),
(75, 3, 'Goat milk', 24),
(76, 3, 'Almond milk', 30),
(77, 3, 'Milk', 31),
(78, 3, 'Coconut Milk', 40),
(79, 3, 'Natural milk', 32),
(80, 3, 'Skim milk', 27),
(81, 3, 'Oat milk (raw)', 69),
(82, 3, 'Rice Milk', 85),
(83, 3, 'Soya milk', 30),
(84, 3, 'Chocolate milk', 34),
(85, 3, 'Skim milk', 31),
(86, 3, 'Whole milk', 34),
(87, 3, 'Ice cream', 62),
(88, 3, 'Ice cream (with fructose)', 35),
(89, 3, 'Soya milk ice cream', 35),
(90, 3, 'Ice cream (skim, vanilla)', 46),
(91, 3, 'Skim cheese', 30),
(92, 3, 'Yogurt', 32),
(93, 3, 'Cream (18%)', 33),
(94, 3, 'Cream (10%)', 30),
(95, 3, 'Sour cream (20%)', 56),
(96, 3, 'Soya cream', 20),
(97, 3, 'Processed cheese', 57),
(98, 3, 'Tofu cheese', 15),
(99, 3, 'Chees Feta', 30),
(100, 3, 'Cottage cheese pancakes', 70),
(101, 3, 'Cottage cheese', 30),
(102, 3, 'Cottage cheese 9% fat', 30),
(103, 3, 'Low-fat cottage cheese', 30),
(104, 3, 'Curd', 45),
(105, 3, 'Whole milk 3%', 27);

CREATE TABLE `result` (
  `id` int(255) NOT NULL,
  `id_users` int(255) NOT NULL,
  `id_food` int(255) NOT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `charbo` int(255) DEFAULT NULL,
  `protein` int(255) DEFAULT NULL,
  `fat` int(255) DEFAULT NULL,
  `calorie` int(255) DEFAULT NULL,
  `serving_size` int(255) NOT NULL,
  `GL` int(255) DEFAULT NULL
) ;

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('F','M') NOT NULL
) ;

ALTER TABLE `food_category`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `gi_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

ALTER TABLE `result`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_food` (`id_food`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `food_category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `gi_food`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1937;

ALTER TABLE `result`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9956047;

ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

ALTER TABLE `gi_food`
  ADD CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `food_category` (`id`);

ALTER TABLE `result`
  ADD CONSTRAINT `id_food` FOREIGN KEY (`id_food`) REFERENCES `gi_food` (`id`),
  ADD CONSTRAINT `id_users` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);
COMMIT;

