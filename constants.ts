import { HexagramData } from './types';

// Simplified map of 64 hexagrams. 
// The key is the binary representation (bottom to top, 0 for Yin, 1 for Yang).
// This allows O(1) lookup after we calculate the hexagram structure.
export const HEXAGRAMS: Record<string, HexagramData> = {
  "111111": { 
    number: 1, name: "Qián", character: "乾", pinyin: "Qián", english: "The Creative", 
    description: "The Creative works sublime success, furthering through perseverance.", 
    judgment: "THE CREATIVE works sublime success, furthering through perseverance. The Creative brings about the beginning of all things and underpins them with heaven. Its way is great and success is certain.",
    imagery: "The movement of heaven is full of power. Thus the superior man makes himself strong and untiring."
  },
  "000000": { 
    number: 2, name: "Kūn", character: "坤", pinyin: "Kūn", english: "The Receptive", 
    description: "The Receptive brings about sublime success, furthering through the perseverance of a mare.", 
    judgment: "THE RECEPTIVE brings about sublime success, furthering through the perseverance of a mare. If the superior man undertakes something and tries to lead, he goes astray; but if he follows, he finds guidance.",
    imagery: "The earth's condition is receptive devotion. Thus the superior man who has breadth of character carries the outer world."
  },
  "100010": { 
    number: 3, name: "Zhūn", character: "屯", pinyin: "Zhūn", english: "Difficulty at the Beginning", 
    description: "Sprouting difficulty in the beginning brings sublime success, furthering through perseverance.", 
    judgment: "DIFFICULTY AT THE BEGINNING works sublime success, furthering through perseverance. Nothing should be undertaken. It is further to appoint helpers.",
    imagery: "Clouds and thunder: The image of DIFFICULTY AT THE BEGINNING. Thus the superior man brings order out of confusion."
  },
  "010001": { 
    number: 4, name: "Méng", character: "蒙", pinyin: "Méng", english: "Youthful Folly", 
    description: "Youthful Folly has success. It is not I who seek the young fool; the young fool seeks me.", 
    judgment: "YOUTHFUL FOLLY has success. It is not I who seek the young fool; the young fool seeks me. At the first oracle I inform him. If he asks two or three times, it is importunity. If he importunes, I give him no information. Perseverance furthers.",
    imagery: "A spring wells up at the foot of the mountain: The image of YOUTH. Thus the superior man fosters his character by thoroughness in all that he does."
  },
  "111010": { 
    number: 5, name: "Xū", character: "需", pinyin: "Xū", english: "Waiting", 
    description: "Waiting. If you are sincere, you have light and success. Perseverance brings good fortune.", 
    judgment: "WAITING. If you are sincere, you have light and success. Perseverance brings good fortune. It furthers one to cross the great water.",
    imagery: "Clouds rise up to heaven: The image of WAITING. Thus the superior man eats and drinks, and is joyous and of good cheer."
  },
  "010111": { 
    number: 6, name: "Sòng", character: "訟", pinyin: "Sòng", english: "Conflict", 
    description: "Conflict. You are sincere and are being obstructed. A cautious halt halfway brings good fortune.", 
    judgment: "CONFLICT. You are sincere and are being obstructed. A cautious halt halfway brings good fortune. Going through to the end brings misfortune. It furthers one to see the great man. It does not further one to cross the great water.",
    imagery: "Heaven and water go their separate ways: The image of CONFLICT. Thus in all his transactions the superior man considers the beginning."
  },
  "010000": { 
    number: 7, name: "Shī", character: "師", pinyin: "Shī", english: "The Army", 
    description: "The Army. The army needs perseverance and a strong man. Good fortune without error.", 
    judgment: "THE ARMY. The army needs perseverance and a strong man. Good fortune without error.",
    imagery: "In the middle of the earth is water: The image of THE ARMY. Thus the superior man increases his masses by generosity toward the people."
  },
  "000010": { 
    number: 8, name: "Bǐ", character: "比", pinyin: "Bǐ", english: "Holding Together", 
    description: "Holding Together brings good fortune. Inquire of the oracle once again whether you have sublimity, constancy, and perseverance.", 
    judgment: "HOLDING TOGETHER brings good fortune. Inquire of the oracle once again whether you have sublimity, constancy, and perseverance; then there is no blame. Those who are uncertain gradually join. Whoever comes too late meets with misfortune.",
    imagery: "On the earth is water: The image of HOLDING TOGETHER. Thus the kings of antiquity made a gift of the different states as fiefs and cultivated friendly relations with the feudal lords."
  },
  "111011": { 
    number: 9, name: "Xiǎo Chù", character: "小畜", pinyin: "Xiǎo Chù", english: "The Taming Power of the Small", 
    description: "The Taming Power of the Small has success. Dense clouds, no rain from our western region.", 
    judgment: "THE TAMING POWER OF THE SMALL has success. Dense clouds, no rain from our western region.",
    imagery: "The wind drives across the heavens: The image of THE TAMING POWER OF THE SMALL. Thus the superior man refines the outward aspect of his nature."
  },
  "110111": { 
    number: 10, name: "Lǚ", character: "履", pinyin: "Lǚ", english: "Treading", 
    description: "Treading upon the tail of a tiger. It does not bite the man. Success.", 
    judgment: "TREADING upon the tail of a tiger. It does not bite the man. Success.",
    imagery: "Heaven above, the lake below: The image of TREADING. Thus the superior man discriminates between high and low, and thereby fortifies the minds of the people."
  },
  "111000": { 
    number: 11, name: "Tài", character: "泰", pinyin: "Tài", english: "Peace", 
    description: "Peace. The small departs, the great approaches. Good fortune. Success.", 
    judgment: "PEACE. The small departs, the great approaches. Good fortune. Success.",
    imagery: "Heaven and earth unite: The image of PEACE. Thus the ruler divides and completes the course of heaven and earth, and furthers the people."
  },
  "000111": { 
    number: 12, name: "Pǐ", character: "否", pinyin: "Pǐ", english: "Standstill", 
    description: "Standstill. Evil people do not further the perseverance of the superior man. The great departs, the small approaches.", 
    judgment: "STANDSTILL. Evil people do not further the perseverance of the superior man. The great departs, the small approaches.",
    imagery: "Heaven and earth do not unite: The image of STANDSTILL. Thus the superior man falls back upon his inner worth in order to escape the difficulties."
  },
  "101111": { 
    number: 13, name: "Tóng Rén", character: "同人", pinyin: "Tóng Rén", english: "Fellowship with Men", 
    description: "Fellowship with men in the open. Success. It furthers one to cross the great water.", 
    judgment: "FELLOWSHIP WITH MEN in the open. Success. It furthers one to cross the great water. The perseverance of the superior man furthers.",
    imagery: "Heaven together with fire: The image of FELLOWSHIP WITH MEN. Thus the superior man organizes the clans and makes distinctions between things."
  },
  "111101": { 
    number: 14, name: "Dà Yǒu", character: "大有", pinyin: "Dà Yǒu", english: "Possession in Great Measure", 
    description: "Possession in Great Measure. Supreme success.", 
    judgment: "POSSESSION IN GREAT MEASURE. Supreme success.",
    imagery: "Fire in heaven above: The image of POSSESSION IN GREAT MEASURE. Thus the superior man curbs evil and furthers good, and thereby obeys the benevolent will of heaven."
  },
  "001000": { 
    number: 15, name: "Qiān", character: "謙", pinyin: "Qiān", english: "Modesty", 
    description: "Modesty creates success. The superior man carries things through.", 
    judgment: "MODESTY creates success. The superior man carries things through.",
    imagery: "Within the earth, a mountain: The image of MODESTY. Thus the superior man reduces that which is too much and augments that which is too little."
  },
  "000100": { 
    number: 16, name: "Yù", character: "豫", pinyin: "Yù", english: "Enthusiasm", 
    description: "Enthusiasm. It furthers one to install helpers and to set armies in marching.", 
    judgment: "ENTHUSIASM. It furthers one to install helpers and to set armies in marching.",
    imagery: "Thunder comes resounding out of the earth: The image of ENTHUSIASM. Thus the ancient kings made music in order to honor merit, and offered it with splendor as a sacrifice to the Highest Deity."
  },
  "100110": { 
    number: 17, name: "Suí", character: "隨", pinyin: "Suí", english: "Following", 
    description: "Following has supreme success. Perseverance furthers. No blame.", 
    judgment: "FOLLOWING has supreme success. Perseverance furthers. No blame.",
    imagery: "Thunder in the middle of the lake: The image of FOLLOWING. Thus the superior man at nightfall goes indoors for rest and recuperation."
  },
  "011001": { 
    number: 18, name: "Gǔ", character: "蠱", pinyin: "Gǔ", english: "Work on What Has Been Spoiled", 
    description: "Work on what has been spoiled has supreme success. It furthers one to cross the great water.", 
    judgment: "WORK ON WHAT HAS BEEN SPOILED has supreme success. It furthers one to cross the great water. Before the starting point, three days. After the starting point, three days.",
    imagery: "The wind blows low on the mountain: The image of DECAY. Thus the superior man stirs up the people and strengthens their spirit."
  },
  "110000": { 
    number: 19, name: "Lín", character: "臨", pinyin: "Lín", english: "Approach", 
    description: "Approach has supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.", 
    judgment: "APPROACH has supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.",
    imagery: "The earth above the lake: The image of APPROACH. Thus the superior man is inexhaustible in his will to teach, and without limits in his tolerance and protection of the people."
  },
  "000011": { 
    number: 20, name: "Guān", character: "觀", pinyin: "Guān", english: "Contemplation", 
    description: "Contemplation. The ablution has been made, but not yet the offering. Full of trust they look up to him.", 
    judgment: "CONTEMPLATION. The ablution has been made, but not yet the offering. Full of trust they look up to him.",
    imagery: "The wind blows over the earth: The image of CONTEMPLATION. Thus the kings of old visited the regions of the world, contemplated the people, and gave them instruction."
  },
  "100101": { 
    number: 21, name: "Shì Kè", character: "噬嗑", pinyin: "Shì Kè", english: "Biting Through", 
    description: "Biting Through has success. It furthers one to let justice be administered.", 
    judgment: "BITING THROUGH has success. It furthers one to let justice be administered.",
    imagery: "Thunder and lightning: The image of BITING THROUGH. Thus the kings of former times made firm the laws through clearly defined penalties."
  },
  "101001": { 
    number: 22, name: "Bì", character: "賁", pinyin: "Bì", english: "Grace", 
    description: "Grace has success. In small matters it furthers one to undertake something.", 
    judgment: "GRACE has success. In small matters it furthers one to undertake something.",
    imagery: "Fire at the foot of the mountain: The image of GRACE. Thus the superior man throws light upon current affairs, but does not dare to decide controversial issues in this way."
  },
  "000001": { 
    number: 23, name: "Bō", character: "剝", pinyin: "Bō", english: "Splitting Apart", 
    description: "Splitting Apart. It does not further one to go anywhere.", 
    judgment: "SPLITTING APART. It does not further one to go anywhere.",
    imagery: "The mountain rests on the earth: The image of SPLITTING APART. Thus those above can ensure their position only by giving generously to those below."
  },
  "100000": { 
    number: 24, name: "Fù", character: "復", pinyin: "Fù", english: "Return", 
    description: "Return. Success. Going out and coming in without error. Friends come without blame.", 
    judgment: "RETURN. Success. Going out and coming in without error. Friends come without blame. To and fro goes the way. On the seventh day comes return. It furthers one to have somewhere to go.",
    imagery: "Thunder within the earth: The image of THE TURNING POINT. Thus the kings of antiquity closed the passes at the time of solstice."
  },
  "100111": { 
    number: 25, name: "Wú Wàng", character: "無妄", pinyin: "Wú Wàng", english: "Innocence", 
    description: "Innocence. Supreme success. Perseverance furthers. If someone is not as he should be, he has misfortune.", 
    judgment: "INNOCENCE. Supreme success. Perseverance furthers. If someone is not as he should be, he has misfortune, and it does not further him to undertake anything.",
    imagery: "Under heaven thunder rolls: All things attain the natural state of innocence. Thus the kings of old, rich in virtue, cultivated and nourished all beings."
  },
  "111001": { 
    number: 26, name: "Dà Chù", character: "大畜", pinyin: "Dà Chù", english: "The Taming Power of the Great", 
    description: "The Taming Power of the Great. Perseverance furthers. Not eating at home brings good fortune.", 
    judgment: "THE TAMING POWER OF THE GREAT. Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.",
    imagery: "A mountain within heaven: The image of THE TAMING POWER OF THE GREAT. Thus the superior man acquaints himself with many sayings of antiquity and many deeds of the past, in order to strengthen his character thereby."
  },
  "100001": { 
    number: 27, name: "Yí", character: "頤", pinyin: "Yí", english: "The Corners of the Mouth", 
    description: "The Corners of the Mouth. Perseverance brings good fortune. Pay heed to the providing of nourishment.", 
    judgment: "THE CORNERS OF THE MOUTH. Perseverance brings good fortune. Pay heed to the providing of nourishment and to what a man seeks to fill his own mouth with.",
    imagery: "At the foot of the mountain, thunder: The image of PROVIDING NOURISHMENT. Thus the superior man is careful of his words and temperate in eating and drinking."
  },
  "011110": { 
    number: 28, name: "Dà Guò", character: "大過", pinyin: "Dà Guò", english: "Preponderance of the Great", 
    description: "Preponderance of the Great. The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.", 
    judgment: "PREPONDERANCE OF THE GREAT. The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.",
    imagery: "The lake rises above the trees: The image of PREPONDERANCE OF THE GREAT. Thus the superior man, when he stands alone, is unconcerned, and if he has to renounce the world, he is undaunted."
  },
  "010010": { 
    number: 29, name: "Kǎn", character: "坎", pinyin: "Kǎn", english: "The Abysmal", 
    description: "The Abysmal repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.", 
    judgment: "THE ABYSMAL repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.",
    imagery: "Water flows on uninterruptedly and reaches its goal: The image of THE ABYSMAL repeated. Thus the superior man walks in lasting virtue and goes about the business of teaching."
  },
  "101101": { 
    number: 30, name: "Lí", character: "離", pinyin: "Lí", english: "The Clinging", 
    description: "The Clinging. Perseverance furthers. It brings success. Care of the cow brings good fortune.", 
    judgment: "THE CLINGING. Perseverance furthers. It brings success. Care of the cow brings good fortune.",
    imagery: "That which is bright rises twice: The image of FIRE. Thus the great man, by perpetuating this brightness, illumines the four quarters of the world."
  },
  "001110": { 
    number: 31, name: "Xián", character: "咸", pinyin: "Xián", english: "Influence", 
    description: "Influence. Success. Perseverance furthers. To take a maiden to wife brings good fortune.", 
    judgment: "INFLUENCE. Success. Perseverance furthers. To take a maiden to wife brings good fortune.",
    imagery: "A lake on the mountain: The image of INFLUENCE. Thus the superior man encourages people to approach him by his readiness to receive them."
  },
  "011100": { 
    number: 32, name: "Héng", character: "恆", pinyin: "Héng", english: "Duration", 
    description: "Duration. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.", 
    judgment: "DURATION. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.",
    imagery: "Thunder and wind: The image of DURATION. Thus the superior man stands firm and does not change his direction."
  },
  "001111": { 
    number: 33, name: "Dùn", character: "遯", pinyin: "Dùn", english: "Retreat", 
    description: "Retreat. Success. In what is small, perseverance furthers.", 
    judgment: "RETREAT. Success. In what is small, perseverance furthers.",
    imagery: "Mountain under heaven: The image of RETREAT. Thus the superior man keeps the inferior man at a distance, not angrily but with reserve."
  },
  "111100": { 
    number: 34, name: "Dà Zhuàng", character: "大壯", pinyin: "Dà Zhuàng", english: "The Power of the Great", 
    description: "The Power of the Great. Perseverance furthers.", 
    judgment: "THE POWER OF THE GREAT. Perseverance furthers.",
    imagery: "Thunder in the heavens above: The image of THE POWER OF THE GREAT. Thus the superior man does not tread upon paths that do not accord with established order."
  },
  "000101": { 
    number: 35, name: "Jìn", character: "晉", pinyin: "Jìn", english: "Progress", 
    description: "Progress. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.", 
    judgment: "PROGRESS. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.",
    imagery: "The sun rises over the earth: The image of PROGRESS. Thus the superior man himself brightens his bright virtue."
  },
  "101000": { 
    number: 36, name: "Míng Yí", character: "明夷", pinyin: "Míng Yí", english: "Darkening of the Light", 
    description: "Darkening of the Light. In adversity it furthers one to be persevering.", 
    judgment: "DARKENING OF THE LIGHT. In adversity it furthers one to be persevering.",
    imagery: "The light has sunk into the earth: The image of DARKENING OF THE LIGHT. Thus the superior man lives with the great multitude; he veils his light, yet still shines."
  },
  "101011": { 
    number: 37, name: "Jiā Rén", character: "家人", pinyin: "Jiā Rén", english: "The Family", 
    description: "The Family. The perseverance of the woman furthers.", 
    judgment: "THE FAMILY. The perseverance of the woman furthers.",
    imagery: "Wind comes forth from fire: The image of THE FAMILY. Thus the superior man has substance in his words and duration in his way of life."
  },
  "110101": { 
    number: 38, name: "Kuí", character: "睽", pinyin: "Kuí", english: "Opposition", 
    description: "Opposition. In small matters, good fortune.", 
    judgment: "OPPOSITION. In small matters, good fortune.",
    imagery: "Above, fire; below, the lake: The image of OPPOSITION. Thus amid all manifestations of fellowship the superior man retains his individuality."
  },
  "001010": { 
    number: 39, name: "Jiǎn", character: "蹇", pinyin: "Jiǎn", english: "Obstruction", 
    description: "Obstruction. The southwest furthers. The northeast does not further. It furthers one to see the great man.", 
    judgment: "OBSTRUCTION. The southwest furthers. The northeast does not further. It furthers one to see the great man. Perseverance brings good fortune.",
    imagery: "Water on the mountain: The image of OBSTRUCTION. Thus the superior man turns his attention to himself and molds his character."
  },
  "010100": { 
    number: 40, name: "Xiè", character: "解", pinyin: "Xiè", english: "Deliverance", 
    description: "Deliverance. The southwest furthers. If there is no longer anything where one has to go, return brings good fortune.", 
    judgment: "DELIVERANCE. The southwest furthers. If there is no longer anything where one has to go, return brings good fortune. If there is still something where one has to go, hastening brings good fortune.",
    imagery: "Thunder and rain set in: The image of DELIVERANCE. Thus the superior man pardons mistakes and forgives misdeeds."
  },
  "110001": { 
    number: 41, name: "Sǔn", character: "損", pinyin: "Sǔn", english: "Decrease", 
    description: "Decrease combined with sincerity brings supreme good fortune without blame. One may be persevering in this.", 
    judgment: "DECREASE combined with sincerity brings supreme good fortune without blame. One may be persevering in this. It furthers one to undertake something.",
    imagery: "At the foot of the mountain, the lake: The image of DECREASE. Thus the superior man controls his anger and restrains his instincts."
  },
  "100011": { 
    number: 42, name: "Yì", character: "益", pinyin: "Yì", english: "Increase", 
    description: "Increase. It furthers one to undertake something. It furthers one to cross the great water.", 
    judgment: "INCREASE. It furthers one to undertake something. It furthers one to cross the great water.",
    imagery: "Wind and thunder: The image of INCREASE. Thus the superior man: if he sees good, he imitates it; if he has faults, he rids himself of them."
  },
  "111110": { 
    number: 43, name: "Guài", character: "夬", pinyin: "Guài", english: "Break-through", 
    description: "Break-through. One must resolutely make the matter known at the court of the king.", 
    judgment: "BREAK-THROUGH. One must resolutely make the matter known at the court of the king. It must be announced sincerely. Danger. It is necessary to notify one's own city. It does not further to resort to arms. It furthers one to undertake something.",
    imagery: "The lake has risen up to heaven: The image of BREAK-THROUGH. Thus the superior man dispenses riches to those below him, and rests not on his virtue."
  },
  "011111": { 
    number: 44, name: "Gòu", character: "姤", pinyin: "Gòu", english: "Coming to Meet", 
    description: "Coming to Meet. The maiden is powerful. One should not marry such a maiden.", 
    judgment: "COMING TO MEET. The maiden is powerful. One should not marry such a maiden.",
    imagery: "Under heaven, wind: The image of COMING TO MEET. Thus the prince acts when disseminating his orders and proclaiming them to the four quarters of heaven."
  },
  "000110": { 
    number: 45, name: "Cuì", character: "萃", pinyin: "Cuì", english: "Gathering Together", 
    description: "Gathering Together. Success. The king approaches his temple. It furthers one to see the great man.", 
    judgment: "GATHERING TOGETHER. Success. The king approaches his temple. It furthers one to see the great man. This brings success. Perseverance furthers. To bring great offerings yields good fortune. It furthers one to undertake something.",
    imagery: "Over the earth, the lake: The image of GATHERING TOGETHER. Thus the superior man renews his weapons in order to meet the unforeseen."
  },
  "011000": { 
    number: 46, name: "Shēng", character: "升", pinyin: "Shēng", english: "Pushing Upward", 
    description: "Pushing Upward has supreme success. One must see the great man. Fear not.", 
    judgment: "PUSHING UPWARD has supreme success. One must see the great man. Fear not. Departure toward the south brings good fortune.",
    imagery: "Within the earth, wood grows: The image of PUSHING UPWARD. Thus the superior man of devoted character heaps up small things in order to achieve something high and great."
  },
  "010110": { 
    number: 47, name: "Kùn", character: "困", pinyin: "Kùn", english: "Oppression", 
    description: "Oppression. Success. Perseverance. The great man brings about good fortune. No blame.", 
    judgment: "OPPRESSION. Success. Perseverance. The great man brings about good fortune. No blame. When one has something to say, it is not believed.",
    imagery: "There is no water in the lake: The image of EXHAUSTION. Thus the superior man stakes his life on following his will."
  },
  "011010": { 
    number: 48, name: "Jǐng", character: "井", pinyin: "Jǐng", english: "The Well", 
    description: "The Well. The town may be changed, but the well cannot be changed. It neither decreases nor increases.", 
    judgment: "THE WELL. The town may be changed, but the well cannot be changed. It neither decreases nor increases. They come and go and draw from the well. If one reaches nearly the water, but the rope does not go all the way, or the jug breaks, it brings misfortune.",
    imagery: "Water over wood: The image of THE WELL. Thus the superior man encourages the people at their work, and exhorts them to help one another."
  },
  "101110": { 
    number: 49, name: "Gé", character: "革", pinyin: "Gé", english: "Revolution", 
    description: "Revolution. On your own day you are believed. Supreme success, furthering through perseverance.", 
    judgment: "REVOLUTION. On your own day you are believed. Supreme success, furthering through perseverance. Remorse disappears.",
    imagery: "Fire in the lake: The image of REVOLUTION. Thus the superior man sets the calendar in order and makes the seasons clear."
  },
  "011101": { 
    number: 50, name: "Dǐng", character: "鼎", pinyin: "Dǐng", english: "The Cauldron", 
    description: "The Cauldron. Supreme good fortune. Success.", 
    judgment: "THE CAULDRON. Supreme good fortune. Success.",
    imagery: "Fire over wood: The image of THE CAULDRON. Thus the superior man consolidates his fate by making his position correct."
  },
  "100100": { 
    number: 51, name: "Zhèn", character: "震", pinyin: "Zhèn", english: "The Arousing", 
    description: "Shock brings success. Shock comes - oh, oh! Laughing words - ha, ha! The shock terrifies for a hundred miles.", 
    judgment: "SHOCK brings success. Shock comes - oh, oh! Laughing words - ha, ha! The shock terrifies for a hundred miles, and he does not let fall the sacrificial spoon and chalice.",
    imagery: "Thunder repeated: The image of SHOCK. Thus the superior man, in fear and trembling, sets his life in order and examines himself."
  },
  "001001": { 
    number: 52, name: "Gèn", character: "艮", pinyin: "Gèn", english: "Keeping Still", 
    description: "Keeping Still. Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.", 
    judgment: "KEEPING STILL. Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.",
    imagery: "Mountains standing close together: The image of KEEPING STILL. Thus the superior man does not permit his thoughts to go beyond his situation."
  },
  "001011": { 
    number: 53, name: "Jiàn", character: "漸", pinyin: "Jiàn", english: "Development", 
    description: "Development. The maiden is given in marriage. Good fortune. Perseverance furthers.", 
    judgment: "DEVELOPMENT. The maiden is given in marriage. Good fortune. Perseverance furthers.",
    imagery: "On the mountain, a tree: The image of DEVELOPMENT. Thus the superior man abides in dignity and virtue, in order to improve the customs of the people."
  },
  "110100": { 
    number: 54, name: "Guī Mèi", character: "歸妹", pinyin: "Guī Mèi", english: "The Marrying Maiden", 
    description: "The Marrying Maiden. Undertakings bring misfortune. Nothing that would further.", 
    judgment: "THE MARRYING MAIDEN. Undertakings bring misfortune. Nothing that would further.",
    imagery: "Thunder over the lake: The image of THE MARRYING MAIDEN. Thus the superior man understands the transitory in the light of the eternity of the end."
  },
  "101100": { 
    number: 55, name: "Fēng", character: "豐", pinyin: "Fēng", english: "Abundance", 
    description: "Abundance has success. The king attains abundance. Be not sad. Be like the sun at midday.", 
    judgment: "ABUNDANCE has success. The king attains abundance. Be not sad. Be like the sun at midday.",
    imagery: "Both thunder and lightning come: The image of ABUNDANCE. Thus the superior man decides lawsuits and carries out punishments."
  },
  "001101": { 
    number: 56, name: "Lǚ", character: "旅", pinyin: "Lǚ", english: "The Wanderer", 
    description: "The Wanderer. Success through smallness. Perseverance brings good fortune to the wanderer.", 
    judgment: "THE WANDERER. Success through smallness. Perseverance brings good fortune to the wanderer.",
    imagery: "Fire on the mountain: The image of THE WANDERER. Thus the superior man is clear-minded and cautious in imposing punishments, and protracts no lawsuits."
  },
  "011011": { 
    number: 57, name: "Xùn", character: "巽", pinyin: "Xùn", english: "The Gentle", 
    description: "The Gentle. Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.", 
    judgment: "THE GENTLE. Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.",
    imagery: "Winds following one upon another: The image of THE GENTLY PENETRATING. Thus the superior man spreads his commands abroad and carries out his undertakings."
  },
  "110110": { 
    number: 58, name: "Duì", character: "兌", pinyin: "Duì", english: "The Joyous", 
    description: "The Joyous. Success. Perseverance furthers.", 
    judgment: "THE JOYOUS. Success. Perseverance furthers.",
    imagery: "Lakes resting one on the other: The image of THE JOYOUS. Thus the superior man joins with his friends for discussion and practice."
  },
  "010011": { 
    number: 59, name: "Huàn", character: "渙", pinyin: "Huàn", english: "Dispersion", 
    description: "Dispersion. Success. The king approaches his temple. It furthers one to cross the great water.", 
    judgment: "DISPERSION. Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers.",
    imagery: "The wind drives over the water: The image of DISPERSION. Thus the kings of old sacrificed to the Lord and built temples."
  },
  "110010": { 
    number: 60, name: "Jié", character: "節", pinyin: "Jié", english: "Limitation", 
    description: "Limitation. Success. Galling limitation must not be persevered in.", 
    judgment: "LIMITATION. Success. Galling limitation must not be persevered in.",
    imagery: "Water over lake: The image of LIMITATION. Thus the superior man creates number and measure, and examines the nature of virtue and correct conduct."
  },
  "110011": { 
    number: 61, name: "Zhōng Fú", character: "中孚", pinyin: "Zhōng Fú", english: "Inner Truth", 
    description: "Inner Truth. Pigs and fishes. Good fortune. It furthers one to cross the great water.", 
    judgment: "INNER TRUTH. Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.",
    imagery: "Wind over lake: The image of INNER TRUTH. Thus the superior man discusses criminal cases in order to delay executions."
  },
  "001100": { 
    number: 62, name: "Xiǎo Guò", character: "小過", pinyin: "Xiǎo Guò", english: "Preponderance of the Small", 
    description: "Preponderance of the Small. Success. Perseverance furthers. Small things may be done; great things should not be done.", 
    judgment: "PREPONDERANCE OF THE SMALL. Success. Perseverance furthers. Small things may be done; great things should not be done. The flying bird brings the message: It is not well to strive upward, it is well to remain below. Great good fortune.",
    imagery: "Thunder on the mountain: The image of PREPONDERANCE OF THE SMALL. Thus the superior man in his conduct keeps to humility, in mourning he keeps to sorrow, and in his expenditures he keeps to economy."
  },
  "101010": { 
    number: 63, name: "Jì Jì", character: "既濟", pinyin: "Jì Jì", english: "After Completion", 
    description: "After Completion. Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.", 
    judgment: "AFTER COMPLETION. Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.",
    imagery: "Water over fire: The image of AFTER COMPLETION. Thus the superior man takes thought of misfortune and arms himself against it in advance."
  },
  "010101": { 
    number: 64, name: "Wèi Jì", character: "未濟", pinyin: "Wèi Jì", english: "Before Completion", 
    description: "Before Completion. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.", 
    judgment: "BEFORE COMPLETION. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.",
    imagery: "Fire over water: The image of BEFORE COMPLETION. Thus the superior man is careful in the differentiation of things, so that each finds its place."
  }
};