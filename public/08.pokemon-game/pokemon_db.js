// pokemon_db.js

/**
 * 포켓몬 데이터를 배열 형태로 저장하는 데이터베이스 파일입니다.
 * 이 데이터는 웹 페이지에서 포켓몬 도감, 검색, 필터링 등 다양한 기능에 활용될 수 있습니다.
 * 
 * [수정 사항]
 * - 각 포켓몬의 설명(description)에 해당 포켓몬의 이름(name)이 포함된 경우, '■■■'로 수정되었습니다.
 * 
 * [데이터 구조]
 * 각 포켓몬은 하나의 객체(Object)로 표현됩니다.
 * - id: 고유 번호 (Number) - 데이터를 식별하기 위한 유니크한 값입니다.
 * - pokedexId: 도감 번호 (String) - 포켓몬 도감에 표시되는 공식 번호입니다.
 * - name: 포켓몬 이름 (String)
 * - type1: 첫 번째 타입 (String)
 * - type2: 두 번째 타입 (String | null) - 타입이 하나인 포켓몬의 경우 null 값으로 처리됩니다.
 * - image: 이미지 경로 (String) - 웹 페이지에 포켓몬 이미지를 표시하기 위한 경로입니다.
 * - description: 포켓몬 설명 (String) - 포켓몬에 대한 상세 설명입니다.
 */

// 포켓몬 데이터베이스를 정의하는 상수 배열입니다.
// 이 배열은 프로젝트 전역에서 포켓몬 데이터를 참조하는 데 사용됩니다.
const pokemonDB = [
  {
    id: 1,
    pokedexId: 'No.0001',
    name: '이상해씨',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0001.png',
    description: '태어나서 얼마 동안 등의 씨앗에 담긴 영양을 섭취하며 자란다.'
  },
  {
    id: 2,
    pokedexId: 'No.0002',
    name: '이상해풀',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0002.png',
    description: '햇빛을 받을수록 몸에 힘이 솟아나 등의 꽃봉오리가 자라난다.'
  },
  {
    id: 3,
    pokedexId: 'No.0003',
    name: '이상해꽃',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0003.png',
    description: '내리쪼이는 태양 빛을 에너지로 변환할 수 있기 때문에 여름에 더욱 강해진다.'
  },
  {
    id: 6,
    pokedexId: 'No.0004',
    name: '파이리',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0004.png',
    description: '꼬리에서 타오르는 불꽃은 생명력의 상징. 기운이 없으면 불꽃이 약해진다.'
  },
  {
    id: 7,
    pokedexId: 'No.0005',
    name: '리자드',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0005.png',
    description: '불타는 꼬리를 휘두르면 주위의 온도가 점점 올라가 상대를 괴롭게 한다.'
  },
  {
    id: 8,
    pokedexId: 'No.0006',
    name: '리자몽',
    type1: '불꽃',
    type2: '비행',
    image: '/assets/pokemon/No.0006.png',
    description: '정말 화가 난 ■■■의 꼬리 끝 불꽃은 푸르스름하게 불타오른다.'
  },
  {
    id: 12,
    pokedexId: 'No.0007',
    name: '꼬부기',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0007.png',
    description: '태어난 뒤 등이 부풀면서 단단한 등껍질이 생긴다. 입에서 강력한 거품을 발사한다.'
  },
  {
    id: 13,
    pokedexId: 'No.0008',
    name: '어니부기',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0008.png',
    description: '길고 탐스러운 꼬리는 장수의 상징이다. 노인층에게 특히 인기가 많다.'
  },
  {
    id: 14,
    pokedexId: 'No.0009',
    name: '거북왕',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0009.png',
    description: '분사한 물의 기세에 밀리지 않도록 일부러 체중을 무겁게 불리고 있다.'
  },
  {
    id: 17,
    pokedexId: 'No.0010',
    name: '캐터피',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0010.png',
    description: '빨간 더듬이로부터 냄새를 내어 상대를 쫓아 버린다. 탈피를 반복하여 자라난다.'
  },
  {
    id: 18,
    pokedexId: 'No.0011',
    name: '단데기',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0011.png',
    description: '강철같이 단단한 껍질로 부드러운 몸을 보호하고 있다. 진화할 때까지 가만히 참고 있다.'
  },
  {
    id: 19,
    pokedexId: 'No.0012',
    name: '버터플',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0012.png',
    description: '꽃의 꿀을 매우 좋아한다. 약간의 꽃가루만으로 꽃밭이 있는 장소를 찾아낼 수 있다.'
  },
  {
    id: 21,
    pokedexId: 'No.0013',
    name: '뿔충이',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0013.png',
    description: '매일 자신과 똑같은 무게의 잎사귀를 먹는다. 머리의 침으로 달려드는 상대를 물리친다.'
  },
  {
    id: 22,
    pokedexId: 'No.0014',
    name: '딱충이',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0014.png',
    description: '천적에게 발견되지 않도록 잎사귀 뒷면이나 가지의 틈새에 숨어서 진화할 때를 기다린다.'
  },
  {
    id: 23,
    pokedexId: 'No.0015',
    name: '독침붕',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0015.png',
    description: '고속으로 날아다니며 독침으로 공격한 뒤 바로 날아가 버리는 전법이 특기다.'
  },
  {
    id: 25,
    pokedexId: 'No.0016',
    name: '구구',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0016.png',
    description: '싸움을 좋아하지 않는 얌전한 성격이지만 어설프게 건드리면 강력한 반격을 당하게 된다.'
  },
  {
    id: 26,
    pokedexId: 'No.0017',
    name: '피죤',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0017.png',
    description: '넓은 영역을 날아다니며 먹이를 찾는다. 발달한 발톱으로 먹이를 꼼짝 못 하게 한다.'
  },
  {
    id: 27,
    pokedexId: 'No.0018',
    name: '피죤투',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0018.png',
    description: '■■■의 힘찬 날갯짓은 큰 나무도 휠 정도의 강풍을 일으킨다.'
  },
  {
    id: 29,
    pokedexId: 'No.0019',
    name: '꼬렛',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0019.png',
    description: '어떤 장소에도 정착하여 살아갈 수 있는 생명력이 있다. 경계심이 매우 강하다.'
  },
  {
    id: 31,
    pokedexId: 'No.0020',
    name: '레트라',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0020.png',
    description: '계속 자라는 앞니를 갈아 내려고 딱딱한 것을 갉는 습성이 있다. 벽돌로 된 벽도 갉아서 부순다.'
  },
  {
    id: 33,
    pokedexId: 'No.0021',
    name: '깨비참',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0021.png',
    description: '작은 날개를 쉴 새 없이 파닥여 날아오른다. 풀밭에 있는 먹이를 부리로 찾아낸다.'
  },
  {
    id: 34,
    pokedexId: 'No.0022',
    name: '깨비드릴조',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0022.png',
    description: '큰 날개로 온종일 날아다닐 수 있는 체력의 소유자다. 날카로운 부리로 싸운다.'
  },
  {
    id: 35,
    pokedexId: 'No.0023',
    name: '아보',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0023.png',
    description: '자유롭게 턱을 뺄 수 있어서 큰 먹이도 삼킬 수 있지만 무거워져서 움직일 수 없게 된다.'
  },
  {
    id: 36,
    pokedexId: 'No.0024',
    name: '아보크',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0024.png',
    description: '배의 무늬가 무서운 얼굴로 보인다. 약한 적은 그 무늬만 보고도 도망치고 만다.'
  },
  {
    id: 37,
    pokedexId: 'No.0025',
    name: '피카츄',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0025.png',
    description: '양 볼에는 전기를 저장하는 주머니가 있다. 화가 나면 저장한 전기를 단숨에 방출한다.'
  },
  {
    id: 39,
    pokedexId: 'No.0026',
    name: '라이츄',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0026.png',
    description: '꼬리가 어스 역할을 하여 전기를 지면으로 흘려보내므로 자신은 감전되거나 하지 않는다.'
  },
  {
    id: 41,
    pokedexId: 'No.0027',
    name: '모래두지',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0027.png',
    description: '깊은 구멍을 파서 생활한다. 위험이 닥치면 몸을 말아 상대의 공격을 가만히 견딘다.'
  },
  {
    id: 43,
    pokedexId: 'No.0028',
    name: '고지',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0028.png',
    description: '재빠르게 뛰어다니며 등의 가시와 날카로운 발톱으로 공격하는 것이 특기다.'
  },
  {
    id: 45,
    pokedexId: 'No.0029',
    name: '니드런♀',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0029.png',
    description: '싸움을 좋아하지 않는 성격이다. 독침에서 분비된 독은 한 방울만 맞아도 생명을 빼앗긴다.'
  },
  {
    id: 46,
    pokedexId: 'No.0030',
    name: '니드리나',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0030.png',
    description: '위험을 느끼면 전신의 가시를 곤두세운다. 니드리노에 비해서 가시의 성장이 느리다.'
  },
  {
    id: 47,
    pokedexId: 'No.0031',
    name: '니드퀸',
    type1: '독',
    type2: '땅',
    image: '/assets/pokemon/No.0031.png',
    description: '갑옷처럼 단단한 비늘이 전신을 둘러싼다. 둥지의 새끼를 목숨 걸고 지킨다.'
  },
  {
    id: 48,
    pokedexId: 'No.0032',
    name: '니드런♂',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0032.png',
    description: '풀밭 위로 귀만 내놓고 주위의 낌새를 살핀다. 맹독의 뿔로 몸을 보호한다.'
  },
  {
    id: 49,
    pokedexId: 'No.0033',
    name: '니드리노',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0033.png',
    description: '기질이 거친 포켓몬이다. 상대를 깊이 찌른 충격으로 뿔에서 맹독이 배어 나온다.'
  },
  {
    id: 50,
    pokedexId: 'No.0034',
    name: '니드킹',
    type1: '독',
    type2: '땅',
    image: '/assets/pokemon/No.0034.png',
    description: '꼬리를 한 번 휘두르면 전신주를 성냥개비마냥 두 동강 내 버린다.'
  },
  {
    id: 51,
    pokedexId: 'No.0035',
    name: '삐삐',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0035.png',
    description: '■■들은 보름달 밤에 어디에서 왔는지도 모르게 모여 춤춘다. 달빛을 받으면 떠오른다.'
  },
  {
    id: 52,
    pokedexId: 'No.0036',
    name: '픽시',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0036.png',
    description: '요정의 일종으로 모습을 드러내는 것을 좋아하지 않는다. 조용한 산속 깊은 곳에 산다고 전해진다.'
  },
  {
    id: 53,
    pokedexId: 'No.0037',
    name: '식스테일',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0037.png',
    description: '자신보다 강한 상대에게 공격을 받으면 다친 척을 해서 속이고 그 틈을 타서 도망친다.'
  },
  {
    id: 55,
    pokedexId: 'No.0038',
    name: '나인테일',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0038.png',
    description: '9개의 꼬리에는 각각 다른 신비한 힘이 숨어 있다고 한다.'
  },
  {
    id: 57,
    pokedexId: 'No.0039',
    name: '푸린',
    type1: '노말',
    type2: '페어리',
    image: '/assets/pokemon/No.0039.png',
    description: '초롱초롱한 눈동자가 흔들릴 때 졸음이 쏟아지게 하는 이상하고 기분 좋은 노래를 부른다.'
  },
  {
    id: 58,
    pokedexId: 'No.0040',
    name: '푸크린',
    type1: '노말',
    type2: '페어리',
    image: '/assets/pokemon/No.0040.png',
    description: '얇고 고운 털을 지니고 있다. 화나게 하면 몸을 점점 부풀리며 덮쳐 오기 때문에 주의가 필요하다.'
  },
  {
    id: 59,
    pokedexId: 'No.0041',
    name: '주뱃',
    type1: '독',
    type2: '비행',
    image: '/assets/pokemon/No.0041.png',
    description: '입에서 내는 초음파로 두 눈이 없어도 주위의 장애물을 탐색할 수 있다.'
  },
  {
    id: 60,
    pokedexId: 'No.0042',
    name: '골뱃',
    type1: '독',
    type2: '비행',
    image: '/assets/pokemon/No.0042.png',
    description: '사람이나 포켓몬의 혈액을 매우 좋아한다. 목덜미의 혈관을 노리며 밤하늘을 날아다닌다.'
  },
  {
    id: 61,
    pokedexId: 'No.0043',
    name: '뚜벅쵸',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0043.png',
    description: '별명은 걸어 다니는 독초. 밤이 되면 2개의 뿌리로 300m나 걷는다고 한다.'
  },
  {
    id: 62,
    pokedexId: 'No.0044',
    name: '냄새꼬',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0044.png',
    description: '조금씩 배어 나오는 것은 침이 아니다. 꿀 같은 즙으로 먹잇감을 유인하는 것이다.'
  },
  {
    id: 63,
    pokedexId: 'No.0045',
    name: '라플레시아',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0045.png',
    description: '펑 하는 소리와 함께 꽃봉오리가 열리면 알레르기를 일으키는 독 꽃가루가 흩뿌려진다.'
  },
  {
    id: 64,
    pokedexId: 'No.0046',
    name: '파라스',
    type1: '벌레',
    type2: '풀',
    image: '/assets/pokemon/No.0046.png',
    description: '동충하초라고 불리는 버섯을 등에 기르고 있다. ■■■와 함께 크게 자란다.'
  },
  {
    id: 65,
    pokedexId: 'No.0047',
    name: '파라섹트',
    type1: '벌레',
    type2: '풀',
    image: '/assets/pokemon/No.0047.png',
    description: '몸보다 큰 버섯이 ■■■를 조종하고 있다. 독 포자를 여기저기 뿌린다.'
  },
  {
    id: 66,
    pokedexId: 'No.0048',
    name: '콘팡',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0048.png',
    description: '전신에서 독이 스며 나온다. 어두워지면 밝은 곳에 모인 작은 벌레포켓몬을 잡아먹는다.'
  },
  {
    id: 67,
    pokedexId: 'No.0049',
    name: '도나리',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0049.png',
    description: '날개에 가루가 묻어 있어 팔락팔락 날갯짓을 할 때마다 맹독 가루를 흩뿌린다.'
  },
  {
    id: 68,
    pokedexId: 'No.0050',
    name: '디그다',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0050.png',
    description: '지하 1m 정도를 파고들어 가서 나무뿌리 등을 씹어 먹고 산다. 가끔 지상으로 얼굴을 내민다.'
  },
  {
    id: 70,
    pokedexId: 'No.0051',
    name: '닥트리오',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0051.png',
    description: '3개의 머리가 교차하며 움직이는 것은 주변의 흙을 부드럽게 해 파기 쉽게 하기 위해서다.'
  },
  {
    id: 72,
    pokedexId: 'No.0052',
    name: '나옹',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0052.png',
    description: '낮에는 거의 잠만 잔다. 밤이 되면 눈을 반짝이며 영역을 돌아다닌다.'
  },
  {
    id: 76,
    pokedexId: 'No.0053',
    name: '페르시온',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0053.png',
    description: '털의 결이 아름다워 애완용으로 기르려는 사람이 많지만, 곧잘 할퀴려 들기 때문에 쉽지 않다.'
  },
  {
    id: 78,
    pokedexId: 'No.0054',
    name: '고라파덕',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0054.png',
    description: '항상 두통에 시달리고 있다. 이 두통이 심해지면 이상한 힘을 쓰기 시작한다.'
  },
  {
    id: 79,
    pokedexId: 'No.0055',
    name: '골덕',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0055.png',
    description: '물갈퀴가 달린 긴 손발을 써서 전력으로 헤엄치면 왠지 이마에서 빛이 반짝인다.'
  },
  {
    id: 80,
    pokedexId: 'No.0056',
    name: '망키',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0056.png',
    description: '나무 위에 무리 지어 산다. 무리에서 떨어진 ■■는 외로운 나머지 금방 화를 낸다.'
  },
  {
    id: 81,
    pokedexId: 'No.0057',
    name: '성원숭',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0057.png',
    description: '누군가의 시선을 느끼기만 해도 대단히 화를 낸다. 그리고 눈이 마주친 상대를 쫓아다닌다.'
  },
  {
    id: 82,
    pokedexId: 'No.0058',
    name: '가디',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0058.png',
    description: '자신보다 강하고 큰 상대라도 겁 없이 맞서는 용감하고 믿음직스런 성격이다.'
  },
  {
    id: 84,
    pokedexId: 'No.0059',
    name: '윈디',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0059.png',
    description: '초원을 내달리는 모습은 사람들의 마음을 사로잡았다고 옛날 그림에 묘사되어 있다.'
  },
  {
    id: 86,
    pokedexId: 'No.0060',
    name: '발챙이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0060.png',
    description: '배의 소용돌이는 피부 너머로 비쳐 보이는 내장의 일부다. 먹이를 먹으면 선명하게 보인다.'
  },
  {
    id: 87,
    pokedexId: 'No.0061',
    name: '슈륙챙이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0061.png',
    description: '두 다리가 발달하여 지상에서 살 수 있는데도 어째서인지 수중 생활을 좋아한다.'
  },
  {
    id: 88,
    pokedexId: 'No.0062',
    name: '강챙이',
    type1: '물',
    type2: '격투',
    image: '/assets/pokemon/No.0062.png',
    description: '근육을 전부 사용하는 역동적인 헤엄치기가 특기지만 웬일인지 지상에서 생활한다.'
  },
  {
    id: 89,
    pokedexId: 'No.0063',
    name: '캐이시',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0063.png',
    description: '매일 18시간을 잠잔다. 깨어 있을 때도 앉은 채 순간이동으로 이동한다.'
  },
  {
    id: 90,
    pokedexId: 'No.0064',
    name: '윤겔라',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0064.png',
    description: '■■■가 옆에 있으면 TV에 이상한 그림자가 비친다. 그것을 보면 불행해진다고 전해진다.'
  },
  {
    id: 91,
    pokedexId: 'No.0065',
    name: '후딘',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0065.png',
    description: '태어나서부터 체험한 모든 것을 기억하고 있을 정도의 기억력을 가지고 있다. IQ가 5000이 넘는다.'
  },
  {
    id: 93,
    pokedexId: 'No.0066',
    name: '알통몬',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0066.png',
    description: '데구리를 수없이 들었다 놨다 하며 전신의 근육을 단련한다. 모든 격투기를 사용한다.'
  },
  {
    id: 94,
    pokedexId: 'No.0067',
    name: '근육몬',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0067.png',
    description: '■■■의 끝없는 파워는 매우 위험하므로 힘을 제어하는 벨트를 차고 있다.'
  },
  {
    id: 95,
    pokedexId: 'No.0068',
    name: '괴력몬',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0068.png',
    description: '4개의 팔을 눈에 보이지 않을 정도로 빠르게 움직여 2초간 1000발의 펀치를 날린다.'
  },
  {
    id: 97,
    pokedexId: 'No.0069',
    name: '모다피',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0069.png',
    description: '주변에 움직이는 것이 있으면 언제든지 바로 반응해서 가느다란 덩굴을 뻗는다.'
  },
  {
    id: 98,
    pokedexId: 'No.0070',
    name: '우츠동',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0070.png',
    description: '용해액의 효능을 없애는 액체도 분비하고 있어서 자신은 녹지 않는다.'
  },
  {
    id: 99,
    pokedexId: 'No.0071',
    name: '우츠보트',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0071.png',
    description: '꿀 같은 향기에 이끌려 입안에 들어가면 끝장이다.용해액에 녹아 버리게 된다.'
  },
  {
    id: 100,
    pokedexId: 'No.0072',
    name: '왕눈해',
    type1: '물',
    type2: '독',
    image: '/assets/pokemon/No.0072.png',
    description: '바닷물이 빠지면 모래 해변에 남아 바싹 마른 ■■■를 볼 수 있다.'
  },
  {
    id: 101,
    pokedexId: 'No.0073',
    name: '독파리',
    type1: '물',
    type2: '독',
    image: '/assets/pokemon/No.0073.png',
    description: '드물게 대량 발생하면 주변 바다에서 물고기포켓몬이 모두 사라져 버리고 만다.'
  },
  {
    id: 102,
    pokedexId: 'No.0074',
    name: '꼬마돌',
    type1: '바위',
    type2: '땅',
    image: '/assets/pokemon/No.0074.png',
    description: '움직이지 않고 있으면 돌멩이로 착각하여 무심코 밟게 되는데 그러면 주먹을 휘두르며 화를 낸다.'
  },
  {
    id: 104,
    pokedexId: 'No.0075',
    name: '데구리',
    type1: '바위',
    type2: '땅',
    image: '/assets/pokemon/No.0075.png',
    description: '걸음이 늦기 때문에 굴러서 이동한다. 도중에 무슨 일이 있어도 신경 쓰지 않는다.'
  },
  {
    id: 106,
    pokedexId: 'No.0076',
    name: '딱구리',
    type1: '바위',
    type2: '땅',
    image: '/assets/pokemon/No.0076.png',
    description: '암반처럼 단단한 껍질에 싸여 있다. 1년에 1번 탈피하여 커진다.'
  },
  {
    id: 108,
    pokedexId: 'No.0077',
    name: '포니타',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0077.png',
    description: '태어나서 1시간이 지나면 불꽃의 갈기와 꼬리가 자라나 멋진 모습이 된다.'
  },
  {
    id: 110,
    pokedexId: 'No.0078',
    name: '날쌩마',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0078.png',
    description: '달리는 속도는 시속 240km. 갈기의 불꽃이 세차게 타오르고 화살처럼 달려 나간다.'
  },
  {
    id: 112,
    pokedexId: 'No.0079',
    name: '야돈',
    type1: '물',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0079.png',
    description: '움직임이 둔하고 멍청하다. 맞아도 5초는 지나야 아픔을 느낄 정도다.'
  },
  {
    id: 114,
    pokedexId: 'No.0080',
    name: '야도란',
    type1: '물',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0080.png',
    description: '야돈이 바다로 먹이를 잡으러 갔다가 셀러에게 꼬리를 물려 ■■■이 되었다.'
  },
  {
    id: 117,
    pokedexId: 'No.0081',
    name: '코일',
    type1: '전기',
    type2: '강철',
    image: '/assets/pokemon/No.0081.png',
    description: '좌우에 있는 유닛에서 나오는 전자파를 이용해 중력을 거슬러 하늘에 떠 있다.'
  },
  {
    id: 118,
    pokedexId: 'No.0082',
    name: '레어코일',
    type1: '전기',
    type2: '강철',
    image: '/assets/pokemon/No.0082.png',
    description: '3개의 코일은 강한 자력으로 연결되어 있다. 가까이 다가가면 강한 귀울림에 시달리게 된다.'
  },
  {
    id: 119,
    pokedexId: 'No.0083',
    name: '파오리',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0083.png',
    description: '파 줄기가 없으면 살 수 없다. 그래서 파 줄기를 노리는 상대와는 목숨을 걸고 싸운다.'
  },
  {
    id: 121,
    pokedexId: 'No.0084',
    name: '두두',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0084.png',
    description: '완전히 같은 유전자를 가진 쌍둥이의 머리로 호흡이 척척 맞는 콤비네이션을 구사하며 싸운다.'
  },
  {
    id: 122,
    pokedexId: 'No.0085',
    name: '두트리오',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0085.png',
    description: '폐와 심장이 3개로 늘어났다. 두두보다 다리는 느리지만 장시간을 계속 달릴 수 있다.'
  },
  {
    id: 123,
    pokedexId: 'No.0086',
    name: '쥬쥬',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0086.png',
    description: '머리에 있는 뿔은 매우 단단하다. 박치기로 빙산을 부수며 나아간다.'
  },
  {
    id: 124,
    pokedexId: 'No.0087',
    name: '쥬레곤',
    type1: '물',
    type2: '얼음',
    image: '/assets/pokemon/No.0087.png',
    description: '물의 온도가 내려가는 밤에 먹이를 찾아 헤엄친다. 낮에는 얕은 해저에서 잔다.'
  },
  {
    id: 125,
    pokedexId: 'No.0088',
    name: '질퍽이',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0088.png',
    description: '오물이 포켓몬이 되었다. 더러운 장소에 모여 몸의 세균을 번식시킨다.'
  },
  {
    id: 127,
    pokedexId: 'No.0089',
    name: '질뻐기',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0089.png',
    description: '더러운 오물이 온몸에 달라붙었다. 지나간 자리를 건드리기만 해도 독이 퍼져 버린다.'
  },
  {
    id: 129,
    pokedexId: 'No.0090',
    name: '셀러',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0090.png',
    description: '다이아몬드보다 단단한 껍데기에 싸여 있지만 속은 의외로 말랑하다.'
  },
  {
    id: 130,
    pokedexId: 'No.0091',
    name: '파르셀',
    type1: '물',
    type2: '얼음',
    image: '/assets/pokemon/No.0091.png',
    description: '조수의 흐름이 격한 바다에 서식하는 ■■■의 껍데기에 붙은 가시는 크고 날카롭다.'
  },
  {
    id: 131,
    pokedexId: 'No.0092',
    name: '고오스',
    type1: '고스트',
    type2: '독',
    image: '/assets/pokemon/No.0092.png',
    description: '가스로 된 몸으로 휘감은 다음 먹이의 피부를 통해 조금씩 독을 흘려보내어 약하게 만든다.'
  },
  {
    id: 132,
    pokedexId: 'No.0093',
    name: '고우스트',
    type1: '고스트',
    type2: '독',
    image: '/assets/pokemon/No.0093.png',
    description: '어둠을 틈타 가스로 된 손을 뻗쳐 사람의 어깨를 두드리기 좋아한다. 그 손에 닿으면 떨림이 멈추지 않는다.'
  },
  {
    id: 133,
    pokedexId: 'No.0094',
    name: '팬텀',
    type1: '고스트',
    type2: '독',
    image: '/assets/pokemon/No.0094.png',
    description: '생명을 빼앗기로 정한 먹잇감의 그림자에 숨어들어 꼼짝하지 않고 기회를 노린다.'
  },
  {
    id: 136,
    pokedexId: 'No.0095',
    name: '롱스톤',
    type1: '바위',
    type2: '땅',
    image: '/assets/pokemon/No.0095.png',
    description: '■■■이 땅속을 뚫고 나아가면 땅울림이 들리며 지면이 흔들린다. 이동 속도는 시속 80km.'
  },
  {
    id: 137,
    pokedexId: 'No.0096',
    name: '슬리프',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0096.png',
    description: '먹어 치운 꿈은 모두 기억하고 있다. 아이들의 꿈이 맛있기 때문에 어른들의 꿈은 거의 먹지 않는다.'
  },
  {
    id: 138,
    pokedexId: 'No.0097',
    name: '슬리퍼',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0097.png',
    description: '상대와 눈이 마주쳤을 때 최면술 등의 다양한 초능력을 사용한다고 전해진다.'
  },
  {
    id: 139,
    pokedexId: 'No.0098',
    name: '크랩',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0098.png',
    description: '모래 해변에 구멍을 파서 산다. 집게는 싸울 때 떨어져 나가도 다시 자라나 원래대로 돌아온다.'
  },
  {
    id: 140,
    pokedexId: 'No.0099',
    name: '킹크랩',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0099.png',
    description: '큰 집게의 파워는 1만 마력이다. 하지만 너무 무거워서 목표물을 잡는 것이 서투르다.'
  },
  {
    id: 142,
    pokedexId: 'No.0100',
    name: '찌리리공',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0100.png',
    description: '굴러서 이동하기 때문에 땅이 울퉁불퉁하면 충격으로 폭발해 버린다.'
  },
  {
    id: 144,
    pokedexId: 'No.0101',
    name: '붐볼',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0101.png',
    description: '전기 에너지를 모을수록 고속으로 이동할 수 있게 되나 그만큼 폭발하기도 쉬워진다.'
  },
  {
    id: 146,
    pokedexId: 'No.0102',
    name: '아라리',
    type1: '풀',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0102.png',
    description: '알로 착각하여 건드리면 동료들이 모여들어서 집단으로 공격한다.'
  },
  {
    id: 147,
    pokedexId: 'No.0103',
    name: '나시',
    type1: '풀',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0103.png',
    description: '걸어 다니는 열대우림이라고도 불린다. 열매 하나하나마다 얼굴이 있으며, 각자 의지를 가지고 있다.'
  },
  {
    id: 149,
    pokedexId: 'No.0104',
    name: '탕구리',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0104.png',
    description: '사별한 어머니를 생각하며 울 때에는 머리에 쓴 뼈가 달각달각 소리를 낸다.'
  },
  {
    id: 150,
    pokedexId: 'No.0105',
    name: '텅구리',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0105.png',
    description: '태어날 때부터 항상 지니고 있는 뼈를 자유로이 사용한다. 성격은 난폭하다.'
  },
  {
    id: 152,
    pokedexId: 'No.0106',
    name: '시라소몬',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0106.png',
    description: '발차기가 적중하는 순간에 발바닥의 근육을 단단하게 하여 위력을 최대로 끌어올린다.'
  },
  {
    id: 153,
    pokedexId: 'No.0107',
    name: '홍수몬',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0107.png',
    description: '좌우 콤비네이션 펀치로 상대를 몰아붙인 뒤, 시속 500km의 스트레이트로 단숨에 마무리한다.'
  },
  {
    id: 154,
    pokedexId: 'No.0108',
    name: '내루미',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0108.png',
    description: '손 대신 신장의 2배로 늘어나는 혓바닥을 사용한다. 끈적끈적한 타액이 무엇이든 달라붙게 한다.'
  },
  {
    id: 155,
    pokedexId: 'No.0109',
    name: '또가스',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0109.png',
    description: '얇은 풍선 상태의 몸에 맹독의 가스가 채워져 있어 가끔 대폭발을 일으킨다.'
  },
  {
    id: 156,
    pokedexId: 'No.0110',
    name: '또도가스',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0110.png',
    description: '체내에 들어 있는 독가스의 농도를 극한까지 낮추면 최고급의 향수가 된다.'
  },
  {
    id: 158,
    pokedexId: 'No.0111',
    name: '뿔카노',
    type1: '땅',
    type2: '바위',
    image: '/assets/pokemon/No.0111.png',
    description: '반경 10km의 범위를 영역으로 삼고 있으나, 달리다 보면 영역을 잊어버린다고 한다.'
  },
  {
    id: 159,
    pokedexId: 'No.0112',
    name: '코뿌리',
    type1: '땅',
    type2: '바위',
    image: '/assets/pokemon/No.0112.png',
    description: '다이아몬드 원석도 부숴 버리는 위력을 자랑하는 뿔을 동료들과 부딪치며 단련한다.'
  },
  {
    id: 160,
    pokedexId: 'No.0113',
    name: '럭키',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0113.png',
    description: '상처 입은 포켓몬이나 사람이 있으면 영양 만점의 알을 낳아 나눠 주는 상냥한 포켓몬이다.'
  },
  {
    id: 161,
    pokedexId: 'No.0114',
    name: '덩쿠리',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0114.png',
    description: '파란 덩굴로 덮여 있다. 덩굴에 숨겨져 있는 얼굴을 본 사람은 아직 없다.'
  },
  {
    id: 162,
    pokedexId: 'No.0115',
    name: '캥카',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0115.png',
    description: '배의 주머니에서 새끼를 키운다. 안전할 때만 새끼를 주머니에서 꺼내어 놀게 한다.'
  },
  {
    id: 164,
    pokedexId: 'No.0116',
    name: '쏘드라',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0116.png',
    description: '커다란 상대에게 습격당해도 발달한 등지느러미를 사용해 수중에서 자유롭게 도망친다.'
  },
  {
    id: 165,
    pokedexId: 'No.0117',
    name: '시드라',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0117.png',
    description: '수컷이 새끼를 키운다. 이때 접근하는 자가 있으면 맹독을 띠는 가시로 쫓아낸다.'
  },
  {
    id: 166,
    pokedexId: 'No.0118',
    name: '콘치',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0118.png',
    description: '꼬리지느러미를 드레스같이 흔들며 우아하게 헤엄치는 모습은 마치 수중의 여왕 같다.'
  },
  {
    id: 167,
    pokedexId: 'No.0119',
    name: '왕콘치',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0119.png',
    description: '머리의 뿔로 강바닥에 있는 돌을 파내어 둥지를 만든다. 알을 목숨 걸고 지킨다.'
  },
  {
    id: 168,
    pokedexId: 'No.0120',
    name: '별가사리',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0120.png',
    description: '빨간 핵이 있는 한, 몸이 조각나도 바로 재생한다. 한밤중에 핵이 반짝거린다.'
  },
  {
    id: 169,
    pokedexId: 'No.0121',
    name: '아쿠스타',
    type1: '물',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0121.png',
    description: '몸의 중심에 있는 빨간 핵에서 밤하늘을 향해 알 수 없는 전파를 발신한다.'
  },
  {
    id: 170,
    pokedexId: 'No.0122',
    name: '마임맨',
    type1: '에스퍼',
    type2: '페어리',
    image: '/assets/pokemon/No.0122.png',
    description: '팬터마임의 달인이다. 손짓 발짓으로 만든 벽은 이윽고 진짜 벽이 된다.'
  },
  {
    id: 172,
    pokedexId: 'No.0123',
    name: '스라크',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0123.png',
    description: '아주 예리한 낫을 이용해 풀숲을 베며 나아간다. 매우 빠른 움직임에 눈이 따라가지 못한다.'
  },
  {
    id: 173,
    pokedexId: 'No.0124',
    name: '루주라',
    type1: '얼음',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0124.png',
    description: '울음소리는 마치 인간의 말처럼 들리지만 의미는 전혀 이해할 수 없다.'
  },
  {
    id: 174,
    pokedexId: 'No.0125',
    name: '에레브',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0125.png',
    description: '전신에 항상 전기가 흐르고 있기 때문에 가까이 가면 머리카락이 곤두서 버린다.'
  },
  {
    id: 175,
    pokedexId: 'No.0126',
    name: '마그마',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0126.png',
    description: '화산의 분화구 근처에서 발견되었다. 입에서 불꽃을 뿜어낸다. 체온은 1200도나 된다.'
  },
  {
    id: 176,
    pokedexId: 'No.0127',
    name: '쁘사이저',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0127.png',
    description: '2개의 뿔 사이에 먹이를 끼우고 조각날 때까지 놓지 않는다. 조각나지 않으면 저편으로 세게 내던진다.'
  },
  {
    id: 178,
    pokedexId: 'No.0128',
    name: '켄타로스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0128.png',
    description: '목표를 정하면 꼬리로 몸을 채찍질하면서 똑바로 돌진한다.'
  },
  {
    id: 182,
    pokedexId: 'No.0129',
    name: '잉어킹',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0129.png',
    description: '힘없는 한심한 포켓몬이다. 가끔 높이 뛰어오르지만 2m를 겨우 넘기는 게 고작이다.'
  },
  {
    id: 183,
    pokedexId: 'No.0130',
    name: '갸라도스',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0130.png',
    description: '한번 모습을 나타내면 주변 전체를 태워 버리지 않고는 분노가 가라앉지 않는다고 전해진다.'
  },
  {
    id: 185,
    pokedexId: 'No.0131',
    name: '라프라스',
    type1: '물',
    type2: '얼음',
    image: '/assets/pokemon/No.0131.png',
    description: '사람을 등에 태우고 바다를 건넌다. 기분이 좋으면 아름다운 목소리로 노래를 하기도 하는 듯하다.'
  },
  {
    id: 188,
    pokedexId: 'No.0133',
    name: '이브이',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0133.png',
    description: '환경 변화에 곧바로 적응할 수 있도록 여러 형태로 진화할 수 있는 가능성을 가지고 있다.'
  },
  {
    id: 190,
    pokedexId: 'No.0134',
    name: '샤미드',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0134.png',
    description: '물가에 살지만 꼬리에 물고기처럼 지느러미가 남아 있어서 인어로 착각하는 사람도 있다.'
  },
  {
    id: 191,
    pokedexId: 'No.0135',
    name: '쥬피썬더',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0135.png',
    description: '세포가 내고 있는 약한 전기를 하나로 모아서 강력한 전기를 발산한다.'
  },
  {
    id: 192,
    pokedexId: 'No.0136',
    name: '부스터',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0136.png',
    description: '들이마신 공기를 체내의 불꽃 주머니에 보내 1700도의 불꽃으로 내뿜는다.'
  },
  {
    id: 193,
    pokedexId: 'No.0137',
    name: '폴리곤',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0137.png',
    description: '호흡을 하지 않기 때문에 어디서나 활약할 수 있을 것으로 기대되는 인공의 포켓몬이다.'
  },
  {
    id: 194,
    pokedexId: 'No.0138',
    name: '암나이트',
    type1: '바위',
    type2: '물',
    image: '/assets/pokemon/No.0138.png',
    description: '현대의 우수한 과학 기술로 화석에서 부활한 포켓몬이다. 고대의 바다를 헤엄치고 있었다.'
  },
  {
    id: 195,
    pokedexId: 'No.0139',
    name: '암스타',
    type1: '바위',
    type2: '물',
    image: '/assets/pokemon/No.0139.png',
    description: '나선형의 껍질이 너무 커져 버린 것이 원인으로 멸종했다고 여겨지고 있다.'
  },
  {
    id: 196,
    pokedexId: 'No.0140',
    name: '투구',
    type1: '바위',
    type2: '물',
    image: '/assets/pokemon/No.0140.png',
    description: '3억 년 전에 모래 해변에서 살고 있었던 것으로 추측된다. 단단한 껍질이 몸을 보호한다.'
  },
  {
    id: 197,
    pokedexId: 'No.0141',
    name: '투구푸스',
    type1: '바위',
    type2: '물',
    image: '/assets/pokemon/No.0141.png',
    description: '■■■의 먹이가 육상 생활을 시작했기 때문에 ■■■ 역시 육지에 올라온 것으로 추측된다.'
  },
  {
    id: 198,
    pokedexId: 'No.0142',
    name: '프테라',
    type1: '바위',
    type2: '비행',
    image: '/assets/pokemon/No.0142.png',
    description: '공룡 시대의 넓은 하늘을 날아다녔던 포켓몬이다. 톱 같은 이빨을 가지고 있다.'
  },
  {
    id: 200,
    pokedexId: 'No.0143',
    name: '잠만보',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0143.png',
    description: '자고 있을 때를 제외하고는 항상 먹이를 먹고 있는 대식가. 하루에 400kg은 먹어 치운다.'
  },
  {
    id: 202,
    pokedexId: 'No.0144',
    name: '프리져',
    type1: '얼음',
    type2: '비행',
    image: '/assets/pokemon/No.0144.png',
    description: '전설의 새포켓몬이다. 공기 중의 수분을 얼려 눈보라를 만들어 낼 수 있다.'
  },
  {
    id: 204,
    pokedexId: 'No.0145',
    name: '썬더',
    type1: '전기',
    type2: '비행',
    image: '/assets/pokemon/No.0145.png',
    description: '번개 구름 안에 있다고 전해지는 전설의 포켓몬이다. 번개를 자유로이 조종한다.'
  },
  {
    id: 206,
    pokedexId: 'No.0146',
    name: '파이어',
    type1: '불꽃',
    type2: '비행',
    image: '/assets/pokemon/No.0146.png',
    description: '전설의 새포켓몬 중의 1마리다. ■■■가 모습을 보이면 봄이 찾아온다고 전해진다.'
  },
  {
    id: 208,
    pokedexId: 'No.0147',
    name: '미뇽',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0147.png',
    description: '세차게 떨어지는 폭포의 보호를 받으며 탈피를 거듭해 점점 크게 자란다.'
  },
  {
    id: 209,
    pokedexId: 'No.0148',
    name: '신뇽',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0148.png',
    description: '전신에서 오라를 발산하면 주변 날씨가 순식간에 변한다고 한다.'
  },
  {
    id: 210,
    pokedexId: 'No.0149',
    name: '망나뇽',
    type1: '드래곤',
    type2: '비행',
    image: '/assets/pokemon/No.0149.png',
    description: '드넓은 바다 어딘가에는 ■■■만이 모여 사는 섬이 있다고 한다.'
  },
  {
    id: 211,
    pokedexId: 'No.0150',
    name: '뮤츠',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0150.png',
    description: '뮤의 유전자를 재구성해서 만들어졌다. 포켓몬 중에서 가장 난폭한 마음을 가지고 있다고 한다.'
  },
  {
    id: 215,
    pokedexId: 'No.0152',
    name: '치코리타',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0152.png',
    description: '햇볕을 쬐는 것을 매우 좋아한다. 머리의 잎사귀를 사용해서 따뜻한 장소를 찾아낸다.'
  },
  {
    id: 216,
    pokedexId: 'No.0153',
    name: '베이리프',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0153.png',
    description: '목 주변에서 나는 향긋한 향기를 맡으면 왠지 싸우고 싶어진다.'
  },
  {
    id: 217,
    pokedexId: 'No.0154',
    name: '메가니움',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0154.png',
    description: '■■■의 주변에 있으면 삼림욕을 한 것처럼 상쾌한 기분이 든다.'
  },
  {
    id: 218,
    pokedexId: 'No.0155',
    name: '브케인',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0155.png',
    description: '평소에는 몸을 웅크리고 있다. 화가 났을 때와 놀랐을 때 등에서 불꽃을 뿜어낸다.'
  },
  {
    id: 219,
    pokedexId: 'No.0156',
    name: '마그케인',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0156.png',
    description: '싸우기 전에 등을 돌려 자신의 불꽃이 얼마나 대단한지 상대에게 일부러 보여 준다.'
  },
  {
    id: 220,
    pokedexId: 'No.0157',
    name: '블레이범',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0157.png',
    description: '활활 타오르는 털을 문질러 폭풍을 일으켜서 공격하는 큰 기술을 감추어 놓고 있다.'
  },
  {
    id: 222,
    pokedexId: 'No.0158',
    name: '리아코',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0158.png',
    description: '발달한 턱은 파워풀해서 뭐든지 깨물어 부수기 때문에 어버이 트레이너라도 주의해야 한다.'
  },
  {
    id: 223,
    pokedexId: 'No.0159',
    name: '엘리게이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0159.png',
    description: '한번 문 먹잇감을 무슨 일이 있어도 놓치지 않도록 이빨 끝이 뒤로 휘어져 있다.'
  },
  {
    id: 224,
    pokedexId: 'No.0160',
    name: '장크로다일',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0160.png',
    description: '크고 힘센 턱으로 한번 물면 그대로 목을 흔들어 상대를 갈기갈기 찢는다.'
  },
  {
    id: 225,
    pokedexId: 'No.0161',
    name: '꼬리선',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0161.png',
    description: '경계심이 강한 포켓몬이다. 유연하게 움직이는 꼬리는 근육질이라 만져 보면 단단하다.'
  },
  {
    id: 226,
    pokedexId: 'No.0162',
    name: '다꼬리',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0162.png',
    description: '가늘고 긴 굴에서 새끼를 키운다. 새끼가 자라면 굴 밖에서 독립할 준비를 시킨다.'
  },
  {
    id: 227,
    pokedexId: 'No.0163',
    name: '부우부',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0163.png',
    description: '체내의 시간 감각은 어느 때든 정확해서 규칙적인 리듬으로 목을 기울인다.'
  },
  {
    id: 228,
    pokedexId: 'No.0164',
    name: '야부엉',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0164.png',
    description: '양쪽 눈이 특수한 구조다. 적은 양의 빛이라도 잘 모아 어둠 속에서도 주위를 분별한다.'
  },
  {
    id: 229,
    pokedexId: 'No.0165',
    name: '레디바',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0165.png',
    description: '무리를 짓지 않으면 불안해서 움직일 수 없을 정도로 겁쟁이다. 냄새로 서로의 마음을 전한다.'
  },
  {
    id: 230,
    pokedexId: 'No.0166',
    name: '레디안',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0166.png',
    description: '별빛을 에너지로 쓴다. 밤하늘의 별의 수가 늘어나면 등의 무늬가 커진다.'
  },
  {
    id: 231,
    pokedexId: 'No.0167',
    name: '페이검',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0167.png',
    description: '실을 둘러쳐서 만든 둥지에 먹잇감이 걸리더라도 어두워질 때까지 가만히 기다린다.'
  },
  {
    id: 232,
    pokedexId: 'No.0168',
    name: '아리아도스',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0168.png',
    description: '항상 엉덩이에서 나오는 특별한 한 가닥의 실을 더듬어 가면 둥지와 연결되어 있다.'
  },
  {
    id: 233,
    pokedexId: 'No.0169',
    name: '크로뱃',
    type1: '독',
    type2: '비행',
    image: '/assets/pokemon/No.0169.png',
    description: '4장의 날개로 보다 조용히 더욱 빠르게 날 수 있게 되었다. 밤이 되면 활동을 시작한다.'
  },
  {
    id: 234,
    pokedexId: 'No.0170',
    name: '초라기',
    type1: '물',
    type2: '전기',
    image: '/assets/pokemon/No.0170.png',
    description: '빛이 닿지 않는 해저에 산다. 촉수를 빛내 동료들과 커뮤니케이션을 한다.'
  },
  {
    id: 235,
    pokedexId: 'No.0171',
    name: '랜턴',
    type1: '물',
    type2: '전기',
    image: '/assets/pokemon/No.0171.png',
    description: '먹이를 유인하기 위해 눈부시게 빛나는 부분은 등지느러미의 일부가 변화한 것이다.'
  },
  {
    id: 236,
    pokedexId: 'No.0172',
    name: '피츄',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0172.png',
    description: '전기를 모으는 게 서툴다. 조금만 충격을 받아도 금방 방전해 버린다.'
  },
  {
    id: 237,
    pokedexId: 'No.0173',
    name: '삐',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0173.png',
    description: '유성이 반짝거리는 심야에 지그시 하늘을 바라보는 모습은 고향의 기억을 떠올리는 것 같다.'
  },
  {
    id: 238,
    pokedexId: 'No.0174',
    name: '푸푸린',
    type1: '노말',
    type2: '페어리',
    image: '/assets/pokemon/No.0174.png',
    description: '은은하게 달콤한 향기가 나며 잘 튕기는 부드러운 몸은 한번 튀기 시작하면 멈추지 않는다.'
  },
  {
    id: 239,
    pokedexId: 'No.0175',
    name: '토게피',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0175.png',
    description: '껍질 안에 많은 행복이 가득 차 있어 상냥한 사람에게 행복을 나누어 준다고 한다.'
  },
  {
    id: 240,
    pokedexId: 'No.0176',
    name: '토게틱',
    type1: '페어리',
    type2: '비행',
    image: '/assets/pokemon/No.0176.png',
    description: '상냥한 사람의 근처에 나타나 행복의 가루라고 불리는 반짝이는 깃털을 흩뿌린다고 한다.'
  },
  {
    id: 241,
    pokedexId: 'No.0177',
    name: '네이티',
    type1: '에스퍼',
    type2: '비행',
    image: '/assets/pokemon/No.0177.png',
    description: '선인장의 봉오리나 가시를 재주 있게 피하며 쪼아 댄다. 마치 뛰어오르는 것처럼 이동한다.'
  },
  {
    id: 242,
    pokedexId: 'No.0178',
    name: '네이티오',
    type1: '에스퍼',
    type2: '비행',
    image: '/assets/pokemon/No.0178.png',
    description: '과거와 미래를 내다볼 수 있다. 매일 태양의 움직임을 관찰하는 이상한 포켓몬이다.'
  },
  {
    id: 243,
    pokedexId: 'No.0179',
    name: '메리프',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0179.png',
    description: '몸에 정전기가 모이면 털이 평소의 2배 정도로 부풀어 오른다. 만지면 마비된다.'
  },
  {
    id: 244,
    pokedexId: 'No.0180',
    name: '보송송',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0180.png',
    description: '전기를 너무 많이 모은 결과 몸의 표면에 솜털조차 자라지 않는 부분이 생겼다.'
  },
  {
    id: 245,
    pokedexId: 'No.0181',
    name: '전룡',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0181.png',
    description: '꼬리의 빛은 멀리까지 전해지기 때문에 예전부터 봉화 역할로서 중요하게 여겨지고 있다.'
  },
  {
    id: 247,
    pokedexId: 'No.0182',
    name: '아르코',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0182.png',
    description: '태양의돌의 영향으로 낮에 활동하게 되었다. 양지에서 춤추는 것을 좋아한다.'
  },
  {
    id: 248,
    pokedexId: 'No.0183',
    name: '마릴',
    type1: '물',
    type2: '페어리',
    image: '/assets/pokemon/No.0183.png',
    description: '전신의 털은 물을 튕겨 내는 성질을 지녀 물을 끼얹어도 말라 있다.'
  },
  {
    id: 249,
    pokedexId: 'No.0184',
    name: '마릴리',
    type1: '물',
    type2: '페어리',
    image: '/assets/pokemon/No.0184.png',
    description: '긴 귀는 뛰어난 센서. 물속의 소리를 구별하여 무엇이 움직이는지 알 수 있다.'
  },
  {
    id: 250,
    pokedexId: 'No.0185',
    name: '꼬지모',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0185.png',
    description: '항상 나무인 척하고 있다. 몸의 구조는 식물보다 돌이나 바위에 가까운 듯하다.'
  },
  {
    id: 251,
    pokedexId: 'No.0186',
    name: '왕구리',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0186.png',
    description: '울음소리가 울려 퍼지면 여기저기에서 발챙이와 슈륙챙이들이 모인다.'
  },
  {
    id: 252,
    pokedexId: 'No.0187',
    name: '통통코',
    type1: '풀',
    type2: '비행',
    image: '/assets/pokemon/No.0187.png',
    description: '바람을 타고 상당히 먼 거리를 이동한다. 팔데아의 ■■■가 어디서 온 것인지는 확실히 밝혀진 것이 없다.'
  },
  {
    id: 253,
    pokedexId: 'No.0188',
    name: '두코',
    type1: '풀',
    type2: '비행',
    image: '/assets/pokemon/No.0188.png',
    description: '■■ 마니아들은 머리에 달린 꽃에서 나는 향기로 어디서 태어났는지를 알 수 있다고 한다.'
  },
  {
    id: 254,
    pokedexId: 'No.0189',
    name: '솜솜코',
    type1: '풀',
    type2: '비행',
    image: '/assets/pokemon/No.0189.png',
    description: '계절풍을 타고 여행한다. 솜 포자가 다 떨어지면 여행과 함께 ■■■의 일생도 끝난다.'
  },
  {
    id: 255,
    pokedexId: 'No.0190',
    name: '에이팜',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0190.png',
    description: '높은 나무 위에서 살고 있다. 나뭇가지에서 가지로 건너뛸 때 꼬리로 능숙하게 밸런스를 잡는다.'
  },
  {
    id: 256,
    pokedexId: 'No.0191',
    name: '해너츠',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0191.png',
    description: '어느 날 아침 갑자기 떨어진다. 약한 것을 알고 있어 진화까지 한결같이 영양을 모은다.'
  },
  {
    id: 257,
    pokedexId: 'No.0192',
    name: '해루미',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0192.png',
    description: '낮에는 지나칠 정도로 활발히 돌아다니지만 해가 저물면 돌연 움직이지 않게 된다.'
  },
  {
    id: 258,
    pokedexId: 'No.0193',
    name: '왕자리',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0193.png',
    description: '날개를 고속으로 퍼덕여 공중에서 정지한 채로 자신의 영역을 감시한다.'
  },
  {
    id: 259,
    pokedexId: 'No.0194',
    name: '우파',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0194.png',
    description: '온몸이 투명한 점막으로 뒤덮여 있으며 맨손으로 만지면 따끔따끔 저려 온다.'
  },
  {
    id: 261,
    pokedexId: 'No.0195',
    name: '누오',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0195.png',
    description: '느긋한 성격으로 늘 제멋대로 헤엄치다가 배의 밑바닥에 머리를 들이받곤 한다.'
  },
  {
    id: 262,
    pokedexId: 'No.0196',
    name: '에브이',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0196.png',
    description: '상대의 움직임을 예지할 때 두 갈래로 갈라져 있는 꼬리의 끝이 미세하게 떨린다.'
  },
  {
    id: 263,
    pokedexId: 'No.0197',
    name: '블래키',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0197.png',
    description: '달의 파동을 몸에 쬐면 고리 모양이 희미하게 빛나며 이상한 힘에 눈을 뜬다.'
  },
  {
    id: 264,
    pokedexId: 'No.0198',
    name: '니로우',
    type1: '악',
    type2: '비행',
    image: '/assets/pokemon/No.0198.png',
    description: '밤에 모습을 보게 되면 불길한 일이 생긴다고 여겨져 몹시 미움받는 포켓몬이다.'
  },
  {
    id: 265,
    pokedexId: 'No.0199',
    name: '야도킹',
    type1: '물',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0199.png',
    description: '물렸을 때 머리에 깊게 스며든 독소에 의해 심상치 않은 능력에 눈을 뜬 야돈이다.'
  },
  {
    id: 267,
    pokedexId: 'No.0200',
    name: '무우마',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0200.png',
    description: '한밤중에 사람을 놀라게 하고 무서워하는 마음을 모아 자신의 에너지로 만드는 포켓몬이다.'
  },
  {
    id: 269,
    pokedexId: 'No.0202',
    name: '마자용',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0202.png',
    description: '까만 꼬리를 필사적으로 숨기는 것은 꼬리에 비밀이 있다는 증거라고 의심받고 있다.'
  },
  {
    id: 270,
    pokedexId: 'No.0203',
    name: '키링키',
    type1: '노말',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0203.png',
    description: '꼬리의 뇌는 매우 작지만 강력한 에스퍼 파워를 발휘하는 중요한 장기다.'
  },
  {
    id: 271,
    pokedexId: 'No.0204',
    name: '피콘',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0204.png',
    description: '나무껍질을 짜 맞춰서 껍질을 두껍게 하는 것을 좋아한다. 무거워져도 신경 쓰지 않는다.'
  },
  {
    id: 272,
    pokedexId: 'No.0205',
    name: '쏘콘',
    type1: '벌레',
    type2: '강철',
    image: '/assets/pokemon/No.0205.png',
    description: '굵은 나무줄기에 달라붙어 있다. 무언가의 기척을 느낄 때마다 껍질 파편을 날려 댄다.'
  },
  {
    id: 273,
    pokedexId: 'No.0206',
    name: '노고치',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0206.png',
    description: '어두운 장소에 미로를 만든다. 누군가에게 발견되면 꼬리로 땅을 파서 도망가려 한다.'
  },
  {
    id: 274,
    pokedexId: 'No.0207',
    name: '글라이거',
    type1: '땅',
    type2: '비행',
    image: '/assets/pokemon/No.0207.png',
    description: '깎아지른 듯한 절벽에 집을 짓는다. 한번 활공하고 나면 튀어 오르면서 집으로 돌아간다.'
  },
  {
    id: 275,
    pokedexId: 'No.0208',
    name: '강철톤',
    type1: '강철',
    type2: '땅',
    image: '/assets/pokemon/No.0208.png',
    description: '땅속의 높은 압력과 열로 단련된 몸은 어떠한 금속보다도 단단하다.'
  },
  {
    id: 277,
    pokedexId: 'No.0209',
    name: '블루',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0209.png',
    description: '실은 겁이 많은 성격이다. 겁먹은 것을 들키지 않기 위해 필사적으로 으르렁거린다.'
  },
  {
    id: 278,
    pokedexId: 'No.0210',
    name: '그랑블루',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0210.png',
    description: '사실은 겁쟁이다. 습격당하면 필사적으로 손발을 흔들어 적을 쫓아내려 한다.'
  },
  {
    id: 279,
    pokedexId: 'No.0211',
    name: '침바루',
    type1: '물',
    type2: '독',
    image: '/assets/pokemon/No.0211.png',
    description: '물을 들이마시기 시작하면 위험하다. 온몸에 난 독침을 흩뿌려서 공격해 오기 때문이다.'
  },
  {
    id: 281,
    pokedexId: 'No.0212',
    name: '핫삼',
    type1: '벌레',
    type2: '강철',
    image: '/assets/pokemon/No.0212.png',
    description: '강철이 함유된 집게로 잡은 것은 아무리 딱딱해도 산산조각이 난다.'
  },
  {
    id: 284,
    pokedexId: 'No.0214',
    name: '헤라크로스',
    type1: '벌레',
    type2: '격투',
    image: '/assets/pokemon/No.0214.png',
    description: '달콤한 꿀을 아주 좋아해서 혼자 독차지하기 위해 자랑스런 뿔을 써서 상대를 내동댕이친다.'
  },
  {
    id: 286,
    pokedexId: 'No.0215',
    name: '포푸니',
    type1: '악',
    type2: '얼음',
    image: '/assets/pokemon/No.0215.png',
    description: '눈에 띄지 않도록 어둠 속에 숨어서 먹이를 습격하는 매우 교활한 포켓몬이다.'
  },
  {
    id: 288,
    pokedexId: 'No.0216',
    name: '깜지곰',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0216.png',
    description: '세꿀버리를 몰래 뒤쫓아서 벌집을 찾아내고는 손바닥으로 꿀을 한가득 퍼먹는다.'
  },
  {
    id: 289,
    pokedexId: 'No.0217',
    name: '링곰',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0217.png',
    description: '다부진 표정을 하고 있지만, 좋아하는 꿀을 핥을 때는 기쁜 나머지 입가가 절로 느슨해진다.'
  },
  {
    id: 290,
    pokedexId: 'No.0218',
    name: '마그마그',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0218.png',
    description: '용암으로 된 몸은 식어서 허물어질 때도 있지만 마그마에 들어가면 낫는다.'
  },
  {
    id: 291,
    pokedexId: 'No.0219',
    name: '마그카르고',
    type1: '불꽃',
    type2: '바위',
    image: '/assets/pokemon/No.0219.png',
    description: '화산 분화구 근처에 산다. 마그마가 식어서 딱딱해진 껍데기에 불꽃 에너지를 비축하고 있다.'
  },
  {
    id: 292,
    pokedexId: 'No.0220',
    name: '꾸꾸리',
    type1: '얼음',
    type2: '땅',
    image: '/assets/pokemon/No.0220.png',
    description: '코끝으로 땅을 파서 먹을 것을 찾아낸다. 얼어붙은 땅도 문제없다.'
  },
  {
    id: 293,
    pokedexId: 'No.0221',
    name: '메꾸리',
    type1: '얼음',
    type2: '땅',
    image: '/assets/pokemon/No.0221.png',
    description: '긴 털에 뒤덮여 있기에 추위에도 강하며 얼음 이빨은 눈이 내리면 더욱 두꺼워진다.'
  },
  {
    id: 294,
    pokedexId: 'No.0222',
    name: '코산호',
    type1: '물',
    type2: '바위',
    image: '/assets/pokemon/No.0222.png',
    description: '남쪽의 깨끗한 바다에는 많은 ■■■가 있다. 더러워진 바다에서는 살 수 없다.'
  },
  {
    id: 296,
    pokedexId: 'No.0223',
    name: '총어',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0223.png',
    description: '입에서 물을 발사하여 하늘을 나는 먹이를 맞혀 떨어뜨린다고 해서 이 이름이 붙여졌다.'
  },
  {
    id: 297,
    pokedexId: 'No.0224',
    name: '대포무노',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0224.png',
    description: '해저의 바위 그늘이나 구멍을 거처로 해서 산다. 빨판으로 먹이에 달라붙어 놓치지 않는다.'
  },
  {
    id: 299,
    pokedexId: 'No.0226',
    name: '만타인',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0226.png',
    description: '파도가 조용할 때는 드넓은 창해를 나는 듯이 헤엄치는 ■■■의 무리와 조우한다.'
  },
  {
    id: 301,
    pokedexId: 'No.0228',
    name: '델빌',
    type1: '악',
    type2: '불꽃',
    image: '/assets/pokemon/No.0228.png',
    description: '수많은 울음소리를 가려 써서 동료들과 의사소통을 하며 사냥을 하는 지능을 가지고 있다.'
  },
  {
    id: 302,
    pokedexId: 'No.0229',
    name: '헬가',
    type1: '악',
    type2: '불꽃',
    image: '/assets/pokemon/No.0229.png',
    description: '입에서 뿜어내는 불꽃에 의해 화상을 입으면 시간이 아무리 지나도 상처 난 자리가 욱신거린다.'
  },
  {
    id: 304,
    pokedexId: 'No.0230',
    name: '킹드라',
    type1: '물',
    type2: '드래곤',
    image: '/assets/pokemon/No.0230.png',
    description: '힘을 비축하기 위해 깊은 해저에서 잠들어 있는 듯하다. 눈을 뜨면 회오리를 일으킨다고 전해진다.'
  },
  {
    id: 305,
    pokedexId: 'No.0231',
    name: '코코리',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0231.png',
    description: '냇가에 굴을 파고 산다. 흙장난을 한 뒤에 몸을 씻지 못하면 안절부절못하기 때문이다.'
  },
  {
    id: 306,
    pokedexId: 'No.0232',
    name: '코리갑',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0232.png',
    description: '튼튼한 피부로 둘러싸여 있기 때문에 차에 부딪혀도 끄떡없다. 그러나 비에는 매우 약하다.'
  },
  {
    id: 307,
    pokedexId: 'No.0233',
    name: '폴리곤2',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0233.png',
    description: '최신 과학에 의해 진화한 인공 포켓몬. 가끔씩 프로그래밍되어 있지 않은 반응을 보인다.'
  },
  {
    id: 308,
    pokedexId: 'No.0234',
    name: '노라키',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0234.png',
    description: '옛날에는 가혹한 환경에서 살았기 때문에 오늘날보다도 사이코 파워가 강력했다고 전해진다.'
  },
  {
    id: 310,
    pokedexId: 'No.0236',
    name: '배루키',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0236.png',
    description: '다양한 상대와 싸우면서 자신에게 맞는 격투 스타일을 모색하는 진지한 포켓몬이다.'
  },
  {
    id: 311,
    pokedexId: 'No.0237',
    name: '카포에라',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0237.png',
    description: '춤추는 듯한 발차기 기술이 특기다. 머리의 뿔은 털이나 발톱과 같은 성분으로 되어 있다.'
  },
  {
    id: 312,
    pokedexId: 'No.0238',
    name: '뽀뽀라',
    type1: '얼음',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0238.png',
    description: '무엇이든 입술로 건드려 보고 확인한다. 좋아하는 것도 싫어하는 것도 입술이 기억하고 있다.'
  },
  {
    id: 313,
    pokedexId: 'No.0239',
    name: '에레키드',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0239.png',
    description: '격렬한 벼락을 매우 좋아한다. 몸에 전기를 비축할 때 뿔 사이가 푸르스름하게 빛난다.'
  },
  {
    id: 314,
    pokedexId: 'No.0240',
    name: '마그비',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0240.png',
    description: '숨을 들이쉬거나 내쉴 때마다 입과 코에서 불꽃이 새어 나온다.'
  },
  {
    id: 316,
    pokedexId: 'No.0242',
    name: '해피너스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0242.png',
    description: '■■■가 낳은 알을 한 입이라도 먹은 사람은 누구에게나 상냥해진다.'
  },
  {
    id: 320,
    pokedexId: 'No.0246',
    name: '애버라스',
    type1: '바위',
    type2: '땅',
    image: '/assets/pokemon/No.0246.png',
    description: '땅속 깊은 곳에서 태어나 산을 이룰 정도의 흙을 먹고 나면 몸을 만들기 위해 번데기가 된다.'
  },
  {
    id: 321,
    pokedexId: 'No.0247',
    name: '데기라스',
    type1: '바위',
    type2: '땅',
    image: '/assets/pokemon/No.0247.png',
    description: '체내에서 압축한 가스를 기세 좋게 분출시켜 날며 난동을 피우는 번데기.'
  },
  {
    id: 322,
    pokedexId: 'No.0248',
    name: '마기라스',
    type1: '바위',
    type2: '악',
    image: '/assets/pokemon/No.0248.png',
    description: '주변 지형을 바꾸는 정도쯤은 쉽게 해낼 정도의 힘을 가지고 있다. 주위를 신경 쓰지 않는 대담한 성격.'
  },
  {
    id: 327,
    pokedexId: 'No.0252',
    name: '나무지기',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0252.png',
    description: '발바닥의 작은 가시가 벽이나 천장에 걸리므로 거꾸로 매달려도 떨어지지 않는다.'
  },
  {
    id: 328,
    pokedexId: 'No.0253',
    name: '나무돌이',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0253.png',
    description: '발달한 넓적다리의 근육이 경이로운 순발력과 도약력을 만들어 낸다.'
  },
  {
    id: 329,
    pokedexId: 'No.0254',
    name: '나무킹',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0254.png',
    description: '정글을 가볍게 뛰어다니며 팔에 자란 예리하고 잘 드는 잎날로 먹이를 꼼짝 못 하게 한다.'
  },
  {
    id: 331,
    pokedexId: 'No.0255',
    name: '아차모',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0255.png',
    description: '몸속에 불꽃 주머니를 지니고 있어서 껴안으면 따끈따끈하다. 불꽃은 살아 있는 한 계속 불타오른다.'
  },
  {
    id: 332,
    pokedexId: 'No.0256',
    name: '영치코',
    type1: '불꽃',
    type2: '격투',
    image: '/assets/pokemon/No.0256.png',
    description: '날카로운 울음소리를 내서 집중력을 높인다. 발 기술은 뛰어난 파괴력을 자랑한다.'
  },
  {
    id: 333,
    pokedexId: 'No.0257',
    name: '번치코',
    type1: '불꽃',
    type2: '격투',
    image: '/assets/pokemon/No.0257.png',
    description: '강적을 만나면 손목에서 불꽃을 내뿜는다. 점프로 빌딩을 뛰어넘는 다릿심을 가졌다.'
  },
  {
    id: 335,
    pokedexId: 'No.0258',
    name: '물짱이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0258.png',
    description: '큰 돌을 조각조각으로 부수는 파워를 가졌다. 강바닥에 쌓인 진흙에 몸을 묻고 쉰다.'
  },
  {
    id: 336,
    pokedexId: 'No.0259',
    name: '늪짱이',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0259.png',
    description: '걸쭉하게 질퍽거리는 땅을 밟으며 생활하기 때문에 팔다리가 단련되어 강인해졌다.'
  },
  {
    id: 337,
    pokedexId: 'No.0260',
    name: '대짱이',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0260.png',
    description: '돌처럼 딱딱한 팔을 한 번 휘두르는 것만으로 거대한 돌을 조각조각으로 부순다.'
  },
  {
    id: 339,
    pokedexId: 'No.0261',
    name: '포챠나',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0261.png',
    description: '큰 이빨을 드러낸 채 맹렬히 짖어 대며 상대를 위협하는 것은 사실 겁이 많기 때문이다.'
  },
  {
    id: 340,
    pokedexId: 'No.0262',
    name: '그라에나',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0262.png',
    description: '리더의 명령을 충실히 따른다. 뛰어난 팀워크로 노린 먹잇감을 절대 놓치지 않는다.'
  },
  {
    id: 341,
    pokedexId: 'No.0263',
    name: '지그제구리',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0263.png',
    description: '지그재그로 걸어서 풀숲이나 땅에 묻혀 있는 보물을 찾아내는 것이 특기인 포켓몬이다.'
  },
  {
    id: 343,
    pokedexId: 'No.0264',
    name: '직구리',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0264.png',
    description: '시속 100km로 먹이를 덮치지만 직선으로만 달릴 수 있어서 실패할 때도 많다.'
  },
  {
    id: 345,
    pokedexId: 'No.0265',
    name: '개무소',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0265.png',
    description: '잎사귀를 매우 좋아한다. 찌르꼬에게 습격당했을 때는 엉덩이의 가시로 물리친다.'
  },
  {
    id: 346,
    pokedexId: 'No.0266',
    name: '실쿤',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0266.png',
    description: '몸에서 나오는 실을 가지에 휘감아서 떨어지지 않게 고정한다. 가만히 꼼짝 않고 진화를 기다린다.'
  },
  {
    id: 347,
    pokedexId: 'No.0267',
    name: '뷰티플라이',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0267.png',
    description: '가늘고 긴 입을 깊이 찔러 상대의 체액을 흡수한다. 공격적인 성격이다.'
  },
  {
    id: 348,
    pokedexId: 'No.0268',
    name: '카스쿤',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0268.png',
    description: '고치 안은 온도가 높다. 그 안에서 전신의 세포가 진화의 에너지를 만들어 낸다.'
  },
  {
    id: 349,
    pokedexId: 'No.0269',
    name: '독케일',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0269.png',
    description: '야행성 포켓몬이다. 불빛에 이끌려 나온 ■■■이 가로수의 잎을 헤적거리며 먹어 댄다.'
  },
  {
    id: 350,
    pokedexId: 'No.0270',
    name: '연꽃몬',
    type1: '물',
    type2: '풀',
    image: '/assets/pokemon/No.0270.png',
    description: '머리의 잎사귀는 먼지를 튕겨 내는 성질을 가졌다. 진흙투성이인 포켓몬을 태워도 잎사귀는 여전히 깨끗하다.'
  },
  {
    id: 351,
    pokedexId: 'No.0271',
    name: '로토스',
    type1: '물',
    type2: '풀',
    image: '/assets/pokemon/No.0271.png',
    description: '북신의 오랜 전승에 의하면 장난꾸러기 아이가 포켓몬으로 다시 태어난 것이라고 기록되어 있다.'
  },
  {
    id: 352,
    pokedexId: 'No.0272',
    name: '로파파',
    type1: '물',
    type2: '풀',
    image: '/assets/pokemon/No.0272.png',
    description: '경쾌한 리듬의 음파를 받으면 에너지를 만들어 내는 능력을 온몸에 갖추고 있다.'
  },
  {
    id: 353,
    pokedexId: 'No.0273',
    name: '도토링',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0273.png',
    description: '서식지를 넓히기 위해 나무열매를 흉내 내어 새포켓몬에게 붙잡히는 방식으로 먼 곳까지 이동한다.'
  },
  {
    id: 354,
    pokedexId: 'No.0274',
    name: '잎새코',
    type1: '풀',
    type2: '악',
    image: '/assets/pokemon/No.0274.png',
    description: '깊은 숲속에서 조용히 지낸다. 영역을 침범한 상대에게 풀피리 소리로 경고한다.'
  },
  {
    id: 355,
    pokedexId: 'No.0275',
    name: '다탱구',
    type1: '풀',
    type2: '악',
    image: '/assets/pokemon/No.0275.png',
    description: '고목 꼭대기에 올라 잎사귀 부채를 부치면 찬 바람이 일어서 계절이 겨울로 바뀐다고 전해진다.'
  },
  {
    id: 356,
    pokedexId: 'No.0276',
    name: '테일로',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0276.png',
    description: '강한 상대에게도 용감히 맞서는 근성의 소유자다. 따뜻한 땅을 찾아서 난다.'
  },
  {
    id: 357,
    pokedexId: 'No.0277',
    name: '스왈로',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0277.png',
    description: '상공을 선회하면서 먹이를 찾으면 거꾸로 급강하하여 낚아 챈다.'
  },
  {
    id: 358,
    pokedexId: 'No.0278',
    name: '갈모매',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0278.png',
    description: '상승 기류를 타고 글라이더처럼 넓은 하늘을 돌며 부리로 집은 먹이를 운반한다.'
  },
  {
    id: 359,
    pokedexId: 'No.0279',
    name: '패리퍼',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0279.png',
    description: '부리에 작은 포켓몬을 넣고 나는 하늘의 배달부. 바다 위에 떠서 날개를 쉬어 주기도 한다.'
  },
  {
    id: 360,
    pokedexId: 'No.0280',
    name: '랄토스',
    type1: '에스퍼',
    type2: '페어리',
    image: '/assets/pokemon/No.0280.png',
    description: '사람의 감정을 머리의 빨간 뿔로 민감하게 감지하는 힘을 가졌다.'
  },
  {
    id: 361,
    pokedexId: 'No.0281',
    name: '킬리아',
    type1: '에스퍼',
    type2: '페어리',
    image: '/assets/pokemon/No.0281.png',
    description: '사이코 파워를 조작해 주변의 공간을 일그러뜨려 미래를 내다볼 수 있다.'
  },
  {
    id: 362,
    pokedexId: 'No.0282',
    name: '가디안',
    type1: '에스퍼',
    type2: '페어리',
    image: '/assets/pokemon/No.0282.png',
    description: '트레이너를 지키기 위해서라면 사이코 파워를 모두 써서 작은 블랙홀을 만들어 낸다.'
  },
  {
    id: 364,
    pokedexId: 'No.0283',
    name: '비구술',
    type1: '벌레',
    type2: '물',
    image: '/assets/pokemon/No.0283.png',
    description: '보통은 연못에서 살고 있지만 소나기가 온 뒤에는 마을 안의 물웅덩이에 모습을 드러낸다.'
  },
  {
    id: 365,
    pokedexId: 'No.0284',
    name: '비나방',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0284.png',
    description: '4장의 날개로 떠올라 전후좌우 자유자재로 날아다닐 수 있다.'
  },
  {
    id: 366,
    pokedexId: 'No.0285',
    name: '버섯꼬',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0285.png',
    description: '습한 장소를 좋아해서 낮에는 숲의 그늘에서 가만히 있는다. 머리에서 독 가루를 뿌린다.'
  },
  {
    id: 367,
    pokedexId: 'No.0286',
    name: '버섯모',
    type1: '풀',
    type2: '격투',
    image: '/assets/pokemon/No.0286.png',
    description: '독 포자를 뿌려 들이마시고 괴로워하는 상대에게 강렬한 펀치를 날린다.'
  },
  {
    id: 368,
    pokedexId: 'No.0287',
    name: '게을로',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0287.png',
    description: '하루 중 20시간을 잔다. 보고 있는 상대의 졸음을 유도하는 것도 가지고 있는 능력 중 하나.'
  },
  {
    id: 369,
    pokedexId: 'No.0288',
    name: '발바로',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0288.png',
    description: '몸을 움직이지 않으면 스트레스가 너무 쌓여서 상태가 나빠져 버린다.'
  },
  {
    id: 370,
    pokedexId: 'No.0289',
    name: '게을킹',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0289.png',
    description: '세계에서 제일 게으르지만 쌓인 에너지를 한 번에 표출하면 무서울 정도의 파워를 발휘한다.'
  },
  {
    id: 371,
    pokedexId: 'No.0290',
    name: '토중몬',
    type1: '벌레',
    type2: '땅',
    image: '/assets/pokemon/No.0290.png',
    description: '땅 밑에서 성장한다. 거의 보이지 않는 눈 대신 더듬이로 상황을 살핀다.'
  },
  {
    id: 372,
    pokedexId: 'No.0291',
    name: '아이스크',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0291.png',
    description: '매우 고속으로 움직이므로 모습이 보이지 않게 될 때가 있다. 수액에 모여든다.'
  },
  {
    id: 373,
    pokedexId: 'No.0292',
    name: '껍질몬',
    type1: '벌레',
    type2: '고스트',
    image: '/assets/pokemon/No.0292.png',
    description: '허물 속으로 영혼이 들어갔다. 등에 난 틈새로 들여다보면 영혼을 빼앗겨 버린다고 한다.'
  },
  {
    id: 374,
    pokedexId: 'No.0293',
    name: '소곤룡',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0293.png',
    description: '평소에는 속삭이는 듯한 울음소리를 낸다. 불안해지면 제트기와 같은 음량으로 울어 댄다.'
  },
  {
    id: 375,
    pokedexId: 'No.0294',
    name: '노공룡',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0294.png',
    description: '큰 소리의 충격파로 트럭을 뒤집어 버린다. 발을 쿵쾅거리며 파워를 올린다.'
  },
  {
    id: 376,
    pokedexId: 'No.0295',
    name: '폭음룡',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0295.png',
    description: '■■■이 울부짖는 소리는 10km 전방까지 닿는다. 몸 곳곳의 구멍에서 갖가지 소리를 낸다.'
  },
  {
    id: 377,
    pokedexId: 'No.0296',
    name: '마크탕',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0296.png',
    description: '힘든 수행을 반복하며 강해진다. 어떤 공격도 참아 내는 근성의 포켓몬이다.'
  },
  {
    id: 378,
    pokedexId: 'No.0297',
    name: '하리뭉',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0297.png',
    description: '힘겨루기를 매우 좋아한다. 달리는 열차를 손바닥치기로 멈추게 하는 파워를 가졌다.'
  },
  {
    id: 379,
    pokedexId: 'No.0298',
    name: '루리리',
    type1: '노말',
    type2: '페어리',
    image: '/assets/pokemon/No.0298.png',
    description: '고무공처럼 잘 튀는 꼬리를 휘두르며 자신보다도 커다란 상대에게 맞선다.'
  },
  {
    id: 380,
    pokedexId: 'No.0299',
    name: '코코파스',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0299.png',
    description: '■■■의 코의 자석은 절대로 고장 나지 않아서 여행하는 트레이너의 좋은 파트너이다.'
  },
  {
    id: 381,
    pokedexId: 'No.0300',
    name: '에나비',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0300.png',
    description: '움직이는 것을 무심코 쫓아간다. 자신의 꼬리를 쫓아서 똑같은 장소를 빙글빙글 돈다.'
  },
  {
    id: 382,
    pokedexId: 'No.0301',
    name: '델케티',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0301.png',
    description: '아름다운 털을 가지고 있어서 여성 트레이너들에게 매우 인기 있다. 정해진 거처를 갖고 있지 않다.'
  },
  {
    id: 383,
    pokedexId: 'No.0302',
    name: '깜까미',
    type1: '악',
    type2: '고스트',
    image: '/assets/pokemon/No.0302.png',
    description: '어두운 동굴에 거처를 만들고 예리한 손톱을 써서 보석을 파내어 먹는다.'
  },
  {
    id: 385,
    pokedexId: 'No.0303',
    name: '입치트',
    type1: '강철',
    type2: '페어리',
    image: '/assets/pokemon/No.0303.png',
    description: '뿔이 변형되어 생긴 큰 턱이 머리에 달려 있다. 철골을 물어서 끊어 버린다.'
  },
  {
    id: 387,
    pokedexId: 'No.0304',
    name: '가보리',
    type1: '강철',
    type2: '바위',
    image: '/assets/pokemon/No.0304.png',
    description: '평소에는 산속에서 살고 있지만 배가 고프면 산기슭에 나타나 선로나 차를 먹어 버린다.'
  },
  {
    id: 388,
    pokedexId: 'No.0305',
    name: '갱도라',
    type1: '강철',
    type2: '바위',
    image: '/assets/pokemon/No.0305.png',
    description: '철광석을 파내어 먹는다. 강철의 몸을 서로 부딪치며 영역 싸움을 하는 습성이 있다.'
  },
  {
    id: 389,
    pokedexId: 'No.0306',
    name: '보스로라',
    type1: '강철',
    type2: '바위',
    image: '/assets/pokemon/No.0306.png',
    description: '강철의 뿔로 단단한 암반을 무너뜨리며 식량이 되는 철을 찾아서 터널을 판다.'
  },
  {
    id: 391,
    pokedexId: 'No.0307',
    name: '요가랑',
    type1: '격투',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0307.png',
    description: '매일 요가 수행을 거르지 않는다. 명상을 통해서 정신력을 높인다.'
  },
  {
    id: 392,
    pokedexId: 'No.0308',
    name: '요가램',
    type1: '격투',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0308.png',
    description: '요가 수행으로 단련된 사이코 파워로 상대의 움직임을 예상할 수 있다.'
  },
  {
    id: 394,
    pokedexId: 'No.0309',
    name: '썬더라이',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0309.png',
    description: '털에 모은 전기를 써서 근육을 자극함으로써 순발력을 높인다.'
  },
  {
    id: 395,
    pokedexId: 'No.0310',
    name: '썬더볼트',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0310.png',
    description: '갈기를 통해 전기를 방출한다. 머리 위에 번개 구름을 만들고 천둥 번개를 떨어뜨려 공격한다.'
  },
  {
    id: 401,
    pokedexId: 'No.0315',
    name: '로젤리아',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0315.png',
    description: '맑은 물을 마시고 자란 ■■■는 산뜻한 색상의 꽃을 피우는 것으로 알려져 있다.'
  },
  {
    id: 402,
    pokedexId: 'No.0316',
    name: '꼴깍몬',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0316.png',
    description: '무엇이든 소화하는 위를 가졌다. 소화할 때 발생하는 가스는 강렬한 악취가 난다.'
  },
  {
    id: 403,
    pokedexId: 'No.0317',
    name: '꿀꺽몬',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0317.png',
    description: '입에 들어가는 크기의 것이라면 무엇이든 통째로 삼킨다. 특수한 위액으로 무엇이든 소화한다.'
  },
  {
    id: 404,
    pokedexId: 'No.0318',
    name: '샤프니아',
    type1: '물',
    type2: '악',
    image: '/assets/pokemon/No.0318.png',
    description: '영역에 침입한 상대를 집단으로 공격한다. 날카로운 이빨은 보트의 밑바닥도 물어뜯는다.'
  },
  {
    id: 405,
    pokedexId: 'No.0319',
    name: '샤크니아',
    type1: '물',
    type2: '악',
    image: '/assets/pokemon/No.0319.png',
    description: '철판도 물어뜯는 이빨을 가졌으며 헤엄치는 속도는 시속 120km다. 별명은 바다의 건달이다.'
  },
  {
    id: 407,
    pokedexId: 'No.0320',
    name: '고래왕자',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0320.png',
    description: '맑은 날에는 모래 해변에 올라가 공처럼 튀면서 논다. 코에서 물을 뿜어낸다.'
  },
  {
    id: 408,
    pokedexId: 'No.0321',
    name: '고래왕',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0321.png',
    description: '제일 큰 포켓몬이다. 숨을 들이쉬지 않고 3000m의 깊이까지 잠수할 수 있다.'
  },
  {
    id: 409,
    pokedexId: 'No.0322',
    name: '둔타',
    type1: '불꽃',
    type2: '땅',
    image: '/assets/pokemon/No.0322.png',
    description: '1200도의 마그마가 체내에서 끓고 있다. 추워지면 마그마가 굳어서 움직임이 둔해진다.'
  },
  {
    id: 410,
    pokedexId: 'No.0323',
    name: '폭타',
    type1: '불꽃',
    type2: '땅',
    image: '/assets/pokemon/No.0323.png',
    description: '화산의 분화구에서 생활한다. 10년마다 등의 혹이 대분화하는 것으로 유명하다.'
  },
  {
    id: 413,
    pokedexId: 'No.0325',
    name: '피그점프',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0325.png',
    description: '뛰어오르는 것을 멈추면 죽는다고 한다. 머리에 이고 있는 진주가 사이코 파워를 증폭시켜 준다.'
  },
  {
    id: 414,
    pokedexId: 'No.0326',
    name: '피그킹',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0326.png',
    description: '상대를 조종할 때 사용하는 이상한 스텝은 옛날에 외국에서 크게 유행했던 적이 있다.'
  },
  {
    id: 416,
    pokedexId: 'No.0328',
    name: '톱치',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0328.png',
    description: '건조한 사막에 서식한다. 원뿔형의 보금자리 속에서 조용히 먹잇감을 계속 기다린다.'
  },
  {
    id: 417,
    pokedexId: 'No.0329',
    name: '비브라바',
    type1: '땅',
    type2: '드래곤',
    image: '/assets/pokemon/No.0329.png',
    description: '미숙한 날개는 나는 것보다는 비벼서 발생하는 초음파로 적을 공격하는 데 사용한다.'
  },
  {
    id: 418,
    pokedexId: 'No.0330',
    name: '플라이곤',
    type1: '땅',
    type2: '드래곤',
    image: '/assets/pokemon/No.0330.png',
    description: '사막의 정령이라고 불린다. 날개를 쳐서 일으킨 모래바람 속에 숨어 있다.'
  },
  {
    id: 419,
    pokedexId: 'No.0331',
    name: '선인왕',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0331.png',
    description: '사막 같은 혹독한 환경을 좋아한다. 몸속에 축적된 물로 30일간 살 수 있다.'
  },
  {
    id: 420,
    pokedexId: 'No.0332',
    name: '밤선인',
    type1: '풀',
    type2: '악',
    image: '/assets/pokemon/No.0332.png',
    description: '사막의 여행자 뒤를 집단으로 쫓아 지쳐 움직이지 못하기를 기다린다.'
  },
  {
    id: 421,
    pokedexId: 'No.0333',
    name: '파비코',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0333.png',
    description: '솜 같은 날개를 손질하는 일은 절대 거르지 않는다. 더러워지면 물로 깨끗하게 씻는다.'
  },
  {
    id: 422,
    pokedexId: 'No.0334',
    name: '파비코리',
    type1: '드래곤',
    type2: '비행',
    image: '/assets/pokemon/No.0334.png',
    description: '마음이 서로 통한 사람이 있으면 부드럽고 아름다운 날개로 살짝 감싸고 허밍을 한다.'
  },
  {
    id: 428,
    pokedexId: 'No.0339',
    name: '미꾸리',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0339.png',
    description: '2개의 수염은 민감한 레이더이다. 진흙으로 탁해진 물속에서도 먹이의 위치를 감지한다.'
  },
  {
    id: 429,
    pokedexId: 'No.0340',
    name: '메깅',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0340.png',
    description: '영역 의식이 매우 강하여 외부의 적이 다가오면 격렬하게 지면을 울리며 덤벼든다.'
  },
  {
    id: 430,
    pokedexId: 'No.0341',
    name: '가재군',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0341.png',
    description: '외국에서 왔다. 더러운 강에서도 개체 수가 증가할 만큼 강한 생명력을 가졌다.'
  },
  {
    id: 431,
    pokedexId: 'No.0342',
    name: '가재장군',
    type1: '물',
    type2: '악',
    image: '/assets/pokemon/No.0342.png',
    description: '호전적인 포켓몬으로 자신의 영역에서 모든 포켓몬을 집게로 집어서 내던진다!'
  },
  {
    id: 432,
    pokedexId: 'No.0343',
    name: '오뚝군',
    type1: '땅',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0343.png',
    description: '한 다리로 회전하면서 이동한다. 고대 유적에서 발견된 희귀한 포켓몬이다.'
  },
  {
    id: 433,
    pokedexId: 'No.0344',
    name: '점토도리',
    type1: '땅',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0344.png',
    description: '고대의 진흙 인형이 괴이한 광선을 쬐어 생명이 깃들면서 포켓몬이 되었다.'
  },
  {
    id: 434,
    pokedexId: 'No.0345',
    name: '릴링',
    type1: '바위',
    type2: '풀',
    image: '/assets/pokemon/No.0345.png',
    description: '약 1억 년 전의 해저에서 살고 있던 고대의 포켓몬이다. 과학의 힘으로 부활했다.'
  },
  {
    id: 435,
    pokedexId: 'No.0346',
    name: '릴리요',
    type1: '바위',
    type2: '풀',
    image: '/assets/pokemon/No.0346.png',
    description: '따뜻한 바다의 얕은 곳에 있다. 바닷물이 빠지면 모래 해변에 숨어 있는 먹이를 파내어 먹는다.'
  },
  {
    id: 436,
    pokedexId: 'No.0347',
    name: '아노딥스',
    type1: '바위',
    type2: '벌레',
    image: '/assets/pokemon/No.0347.png',
    description: '화석에서 부활한 포켓몬의 조상 중 하나. 바다에서 살고 발톱으로 먹이를 잡는다.'
  },
  {
    id: 437,
    pokedexId: 'No.0348',
    name: '아말도',
    type1: '바위',
    type2: '벌레',
    image: '/assets/pokemon/No.0348.png',
    description: '진화하여 지상에서 살게 되었다. 전신이 튼튼한 갑옷으로 덮여 있다.'
  },
  {
    id: 438,
    pokedexId: 'No.0349',
    name: '빈티나',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0349.png',
    description: '더러운 물이라도 아무렇지 않은 터프한 포켓몬. 하지만 추레하고 초라해서 인기는 없다.'
  },
  {
    id: 439,
    pokedexId: 'No.0350',
    name: '밀로틱',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0350.png',
    description: '무지개색이라고 전해지는 아름다운 비늘은 보는 방향을 바꾸면 여러 가지 색으로 변화한다.'
  },
  {
    id: 442,
    pokedexId: 'No.0353',
    name: '어둠대신',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0353.png',
    description: '원한이나 질투 같은 감정이 좋아하는 먹이다. 뾰족하게 솟은 뿔이 인간의 기분을 감지해 낸다.'
  },
  {
    id: 443,
    pokedexId: 'No.0354',
    name: '다크펫',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0354.png',
    description: '버려진 인형에 원념이 깃들어 포켓몬이 되었다. 어둑한 뒷골목에서 발견된다.'
  },
  {
    id: 445,
    pokedexId: 'No.0355',
    name: '해골몽',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0355.png',
    description: '아이가 가진 생체 에너지를 즐겨 먹는다. 한밤중에 아이를 찾아 마을을 배회한다.'
  },
  {
    id: 446,
    pokedexId: 'No.0356',
    name: '미라몽',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0356.png',
    description: '이상한 손의 움직임을 본 상대의 영혼을 몸에서 끄집어낸다고 하여 공포의 대상으로 여겨지고 있다.'
  },
  {
    id: 448,
    pokedexId: 'No.0358',
    name: '치렁',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0358.png',
    description: '머리의 빨판으로 나뭇가지나 집의 처마 밑에 매달린다. 7종류의 음색을 나누어 쓴다.'
  },
  {
    id: 449,
    pokedexId: 'No.0359',
    name: '앱솔',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0359.png',
    description: '재해의 위험을 감지한다. 위험을 알리는 때에만 사람 앞에 나타난다고 한다.'
  },
  {
    id: 451,
    pokedexId: 'No.0360',
    name: '마자',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0360.png',
    description: '동료들과 밀어내기 놀이를 하면서 인내심이 강한 성격으로 자란다. 달콤한 과일을 매우 좋아한다.'
  },
  {
    id: 452,
    pokedexId: 'No.0361',
    name: '눈꼬마',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0361.png',
    description: '커다란 잎사귀 아래서 여러 마리의 ■■■가 모여 사이좋게 살고 있다고 한다.'
  },
  {
    id: 453,
    pokedexId: 'No.0362',
    name: '얼음귀신',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0362.png',
    description: '커다란 입에서 뿜는 냉기로 먹이는 한순간에 꽁꽁. 그대로 아드득아드득 잡아먹는다.'
  },
  {
    id: 455,
    pokedexId: 'No.0363',
    name: '대굴레오',
    type1: '얼음',
    type2: '물',
    image: '/assets/pokemon/No.0363.png',
    description: '유빙의 위를 데굴데굴 굴러서 해안에 다다른다. 헤엄치기에는 불편한 체형이다.'
  },
  {
    id: 456,
    pokedexId: 'No.0364',
    name: '씨레오',
    type1: '얼음',
    type2: '물',
    image: '/assets/pokemon/No.0364.png',
    description: '무엇이든 코 위에서 돌리는 버릇을 가지고 있다. 돌리면서 냄새나 감촉을 기억한다.'
  },
  {
    id: 457,
    pokedexId: 'No.0365',
    name: '씨카이저',
    type1: '얼음',
    type2: '물',
    image: '/assets/pokemon/No.0365.png',
    description: '큰 얼음을 이빨로 부순다. 두꺼운 지방은 추위뿐만 아니라 상대의 공격도 이겨 낸다.'
  },
  {
    id: 458,
    pokedexId: 'No.0366',
    name: '진주몽',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0366.png',
    description: '평생동안 하나만 만드는 진주는 사이코 파워를 증폭시키는 작용을 한다고 한다.'
  },
  {
    id: 459,
    pokedexId: 'No.0367',
    name: '헌테일',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0367.png',
    description: '심해에 서식하는 포켓몬이다. 작은 물고기 형태를 한 꼬리로 먹이를 유인하여 붙잡는다.'
  },
  {
    id: 460,
    pokedexId: 'No.0368',
    name: '분홍장이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0368.png',
    description: '바다의 밑바닥에 살고 있지만 봄이 되면 몸의 분홍색이 웬일인지 선명하게 물든다.'
  },
  {
    id: 463,
    pokedexId: 'No.0371',
    name: '아공이',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0371.png',
    description: '강철에 비견될 정도로 단단한 머리는 바위도 산산조각을 내 버린다. 날개가 자라기를 계속해서 기다린다.'
  },
  {
    id: 464,
    pokedexId: 'No.0372',
    name: '쉘곤',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0372.png',
    description: '껍질 안에서는 폭발적인 스피드로 세포가 변화하며 진화의 준비를 하고 있다.'
  },
  {
    id: 465,
    pokedexId: 'No.0373',
    name: '보만다',
    type1: '드래곤',
    type2: '비행',
    image: '/assets/pokemon/No.0373.png',
    description: '드디어 자라난 날개로 넓은 하늘을 날아다닌다. 기쁜 마음에 화염을 뿜어 일대를 불태워 버린다.'
  },
  {
    id: 467,
    pokedexId: 'No.0374',
    name: '메탕',
    type1: '강철',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0374.png',
    description: '몸에서 나오는 자력과 지상의 자력을 충돌시켜 공중에 떠오른다.'
  },
  {
    id: 468,
    pokedexId: 'No.0375',
    name: '메탕구',
    type1: '강철',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0375.png',
    description: '2마리의 메탕이 합체했다. 2개의 뇌가 연결되었기 때문에 사이코 파워는 보다 강해졌다.'
  },
  {
    id: 469,
    pokedexId: 'No.0376',
    name: '메타그로스',
    type1: '강철',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0376.png',
    description: '4개의 다리를 접어서 난다. 4개의 뇌는 슈퍼컴퓨터보다 우수하다고 전해진다.'
  },
  {
    id: 474,
    pokedexId: 'No.0380',
    name: '라티아스',
    type1: '드래곤',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0380.png',
    description: '빛을 굴절시키는 깃털로 전신을 둘러싸 모습을 보이지 않게 하는 능력을 가지고 있다.'
  },
  {
    id: 476,
    pokedexId: 'No.0381',
    name: '라티오스',
    type1: '드래곤',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0381.png',
    description: '높은 지능을 가진 포켓몬이다. 팔을 접어 날면 제트기를 추월할 만큼 빠르다.'
  },
  {
    id: 478,
    pokedexId: 'No.0382',
    name: '가이오가',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0382.png',
    description: '많은 비를 내리게 하는 능력으로 바다를 넓혔다고 전해진다. 해구의 밑바닥에서 잠들어 있었다.'
  },
  {
    id: 480,
    pokedexId: 'No.0383',
    name: '그란돈',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0383.png',
    description: '먼 옛날 가이오가와 사투를 벌인 후 지하 마그마 속에서 잠들어 있던 포켓몬이다.'
  },
  {
    id: 482,
    pokedexId: 'No.0384',
    name: '레쿠쟈',
    type1: '드래곤',
    type2: '비행',
    image: '/assets/pokemon/No.0384.png',
    description: '구름보다 아득히 먼 위의 오존층에 서식하고 있기 때문에 지상에서 모습을 볼 수 없다.'
  },
  {
    id: 485,
    pokedexId: 'No.0386',
    name: '테오키스',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0386.png',
    description: '운석에 붙어 있던 우주 바이러스의 DNA가 변이하여 생겨난 포켓몬이다.'
  },
  {
    id: 489,
    pokedexId: 'No.0387',
    name: '모부기',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0387.png',
    description: '흙으로 만들어진 등껍질을 만져 보아 적당히 젖어 있다면 그 ■■■는 매우 건강한 것이다.'
  },
  {
    id: 490,
    pokedexId: 'No.0388',
    name: '수풀부기',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0388.png',
    description: '숲에서 사는 ■■■는 아름다운 샘물이 있는 자신만의 비밀 장소를 갖고 있다고 한다.'
  },
  {
    id: 491,
    pokedexId: 'No.0389',
    name: '토대부기',
    type1: '풀',
    type2: '땅',
    image: '/assets/pokemon/No.0389.png',
    description: '오랜 옛날 사람들은 대지 밑에 거대한 ■■■가 있다고 공상했었다.'
  },
  {
    id: 492,
    pokedexId: 'No.0390',
    name: '불꽃숭이',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0390.png',
    description: '몸놀림이 매우 가벼운 포켓몬이다. 주변이 불에 타지 않도록 꼬리의 불꽃을 끈 다음에 잠든다.'
  },
  {
    id: 493,
    pokedexId: 'No.0391',
    name: '파이숭이',
    type1: '불꽃',
    type2: '격투',
    image: '/assets/pokemon/No.0391.png',
    description: '꼬리의 불꽃 세기를 잘 컨트롤하여 자신에게 맞는 거리를 두고 싸운다..'
  },
  {
    id: 494,
    pokedexId: 'No.0392',
    name: '초염몽',
    type1: '불꽃',
    type2: '격투',
    image: '/assets/pokemon/No.0392.png',
    description: '스피드로 상대를 농락한다. 양팔 양다리를 활용한 독특한 방식으로 싸운다.'
  },
  {
    id: 495,
    pokedexId: 'No.0393',
    name: '팽도리',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0393.png',
    description: '걷는 것이 서툴러서 넘어질 때도 있지만 프라이드가 높은 ■■■는 신경 쓰지 않고 당당하게 가슴을 편다.'
  },
  {
    id: 496,
    pokedexId: 'No.0394',
    name: '팽태자',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0394.png',
    description: '무리를 만들지 않고 생활한다. 날개의 강렬한 일격은 큰 나무를 두 동강으로 꺾는다.'
  },
  {
    id: 497,
    pokedexId: 'No.0395',
    name: '엠페르트',
    type1: '물',
    type2: '강철',
    image: '/assets/pokemon/No.0395.png',
    description: '프라이드를 건드리는 자는 유빙까지도 절단하는 날개로 두 동강을 낸다.'
  },
  {
    id: 498,
    pokedexId: 'No.0396',
    name: '찌르꼬',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0396.png',
    description: '벌레포켓몬을 노리고 산과 들을 많은 무리로 날아다닌다. 울음소리가 무척 시끄럽다.'
  },
  {
    id: 499,
    pokedexId: 'No.0397',
    name: '찌르버드',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0397.png',
    description: '자신의 약함을 잘 알고 있기에 항상 무리를 지어 살고 있다. 혼자가 되면 요란하게 운다.'
  },
  {
    id: 500,
    pokedexId: 'No.0398',
    name: '찌르호크',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0398.png',
    description: '■■■가 되면 무리에서 떨어져 혼자서 살아간다. 강인한 날개를 가지고 있다.'
  },
  {
    id: 501,
    pokedexId: 'No.0399',
    name: '비버니',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0399.png',
    description: '어떤 것에도 동요하지 않는 대담한 신경의 소유자다. 보기보다는 기민하게 활동한다.'
  },
  {
    id: 502,
    pokedexId: 'No.0400',
    name: '비버통',
    type1: '노말',
    type2: '물',
    image: '/assets/pokemon/No.0400.png',
    description: '강을 나무줄기나 진흙의 댐으로 막아서 거처를 만든다. 부지런한 일꾼으로 알려져 있다.'
  },
  {
    id: 503,
    pokedexId: 'No.0401',
    name: '귀뚤뚜기',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0401.png',
    description: '다리가 짧아 넘어지려고 할 때마다 단단한 더듬이가 서로 비벼져서 실로폰 같은 소리가 울린다.'
  },
  {
    id: 504,
    pokedexId: 'No.0402',
    name: '귀뚤톡크',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0402.png',
    description: '몸 안에 있는 빈 공간으로 소리를 메아리치게 해 아름다운 울음소리가 된다.'
  },
  {
    id: 505,
    pokedexId: 'No.0403',
    name: '꼬링크',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0403.png',
    description: '몸을 움직일 때마다 근육이 늘어났다 줄어들었다 하여 전기가 발생한다. 궁지에 몰리면 몸이 빛난다.'
  },
  {
    id: 506,
    pokedexId: 'No.0404',
    name: '럭시오',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0404.png',
    description: '날카로운 발톱의 끝에는 강한 전기가 흐르고 있어서 살짝 스치는 것만으로 상대를 기절시킨다.'
  },
  {
    id: 507,
    pokedexId: 'No.0405',
    name: '렌트라',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0405.png',
    description: '벽 저편까지 볼 수 있는 힘으로 도망친 먹이를 쫓는 것 이외에도 미아가 된 아이를 찾기도 한다.'
  },
  {
    id: 508,
    pokedexId: 'No.0406',
    name: '꼬몽울',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0406.png',
    description: '겨울 동안 봉오리를 닫고 추위를 견딘다. 봄이 되면 봉오리를 펴서 꽃가루를 날린다.'
  },
  {
    id: 509,
    pokedexId: 'No.0407',
    name: '로즈레이드',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0407.png',
    description: '달콤한 향기로 유인하여 양팔의 꽃다발 속에 있는 가시의 채찍으로 꼼짝 못 하게 한다.'
  },
  {
    id: 510,
    pokedexId: 'No.0408',
    name: '두개도스',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0408.png',
    description: '1억 년 정도 전의 밀림에서 살았었다. 특기인 박치기로 프테라에게 저항했었다.'
  },
  {
    id: 511,
    pokedexId: 'No.0409',
    name: '램펄드',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0409.png',
    description: '어떤 충격에도 견딜 수 있는 두꺼운 두개골에 눌려 뇌가 자라지 않았다.'
  },
  {
    id: 512,
    pokedexId: 'No.0410',
    name: '방패톱스',
    type1: '바위',
    type2: '강철',
    image: '/assets/pokemon/No.0410.png',
    description: '뛰어난 방어력을 지녔다. 그 덕분에 특별히 다투는 일도 없이 풀이나 나무열매를 먹으며 지낸다.'
  },
  {
    id: 513,
    pokedexId: 'No.0411',
    name: '바리톱스',
    type1: '바위',
    type2: '강철',
    image: '/assets/pokemon/No.0411.png',
    description: '정면에서라면 어떤 공격이든 가드할 수 있지만 뒤에서 습격당하면 방법이 없다.'
  },
  {
    id: 514,
    pokedexId: 'No.0412',
    name: '도롱충이',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0412.png',
    description: '차가운 초겨울 바람을 막으려고 작은 가지나 낙엽을 재료로 도롱이를 만들어 몸을 감싼다.'
  },
  {
    id: 517,
    pokedexId: 'No.0413',
    name: '도롱마담',
    type1: '벌레',
    type2: '풀',
    image: '/assets/pokemon/No.0413.png',
    description: '도롱충이로부터 진화할 때 도롱이가 몸의 일부가 되었다. 일생 도롱이를 벗는 일은 없다.'
  },
  {
    id: 520,
    pokedexId: 'No.0414',
    name: '나메일',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0414.png',
    description: '꽃의 꿀을 매우 좋아한다. 세꿀버리가 모아 둔 꿀을 가로채어 먹어 버린다.'
  },
  {
    id: 521,
    pokedexId: 'No.0415',
    name: '세꿀버리',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0415.png',
    description: '밤이 되면 100마리 정도의 ■■■가 모여 커다란 덩어리가 되어 잠잔다.'
  },
  {
    id: 522,
    pokedexId: 'No.0416',
    name: '비퀸',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0416.png',
    description: '몸통은 새끼들의 둥지다. 여러 페로몬을 내뿜어 새끼들을 자유롭게 조종한다.'
  },
  {
    id: 524,
    pokedexId: 'No.0418',
    name: '브이젤',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0418.png',
    description: '꼬리를 스크루처럼 돌려서 수중을 헤엄치는 것뿐만 아니라 엉겨 붙는 해초도 자를 수 있다.'
  },
  {
    id: 525,
    pokedexId: 'No.0419',
    name: '플로젤',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0419.png',
    description: '부낭을 부풀리면 사람을 등에 태울 수 있다. 부낭을 오그라들게 하여 잠수한다.'
  },
  {
    id: 526,
    pokedexId: 'No.0420',
    name: '체리버',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0420.png',
    description: '진화에 필요한 영양분이 작은 구슬에 모여 있다. 매우 달고 맛있는 듯하다.'
  },
  {
    id: 527,
    pokedexId: 'No.0421',
    name: '체리꼬',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0421.png',
    description: '햇살이 강해지면 꽃이 핀다. 봉오리일 때에 참고 견딘 울분을 한번에 푸는 것이다.'
  },
  {
    id: 529,
    pokedexId: 'No.0422',
    name: '깝질무',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0422.png',
    description: '옛날에는 등에 조개껍질을 지고 있었다. 셀러 등과 가까운 종류의 포켓몬.'
  },
  {
    id: 531,
    pokedexId: 'No.0423',
    name: '트리토돈',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0423.png',
    description: '온몸이 점액으로 끈적거린다. 옛날에는 이 모습의 개체가 압도적으로 더 많았다.'
  },
  {
    id: 533,
    pokedexId: 'No.0424',
    name: '겟핸보숭',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0424.png',
    description: '큰 나무 위에서 산다. 동료와 꼬리를 이으면 기분을 전달할 수 있다고 전해진다.'
  },
  {
    id: 534,
    pokedexId: 'No.0425',
    name: '흔들풍손',
    type1: '고스트',
    type2: '비행',
    image: '/assets/pokemon/No.0425.png',
    description: '풍선으로 착각해 ■■■을 가지고 있었던 어린아이가 사라지는 경우가 있다고 한다.'
  },
  {
    id: 535,
    pokedexId: 'No.0426',
    name: '둥실라이드',
    type1: '고스트',
    type2: '비행',
    image: '/assets/pokemon/No.0426.png',
    description: '몸 안에서 가스를 만들거나 토해 내며 하늘을 나는 높이를 조절한다.'
  },
  {
    id: 536,
    pokedexId: 'No.0427',
    name: '이어롤',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0427.png',
    description: '말고 있던 귀를 기세 좋게 뻗어서 상대를 힘껏 친다. 어른이라도 펄쩍 뛸 만큼 아프다.'
  },
  {
    id: 537,
    pokedexId: 'No.0428',
    name: '이어롭',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0428.png',
    description: '경계심이 강한 포켓몬이다. 위험을 느끼면 푹신푹신한 귀 끝의 털로 몸을 감싼다.'
  },
  {
    id: 539,
    pokedexId: 'No.0429',
    name: '무우마직',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0429.png',
    description: '주문 같은 울음소리지만 가끔 상대를 행복하게 만드는 효과도 감춰져 있다고 한다.'
  },
  {
    id: 540,
    pokedexId: 'No.0430',
    name: '돈크로우',
    type1: '악',
    type2: '비행',
    image: '/assets/pokemon/No.0430.png',
    description: '인정사정 없는 성격. 부하인 니로우의 실패는 절대 용서하지 않는다고 전해진다.'
  },
  {
    id: 541,
    pokedexId: 'No.0431',
    name: '나옹마',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0431.png',
    description: '마음에 안 들면 발톱을 세우지만 가끔 울음소리로 응석을 부리는 성격이 일부에게 매우 인기가 있다.'
  },
  {
    id: 542,
    pokedexId: 'No.0432',
    name: '몬냥이',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0432.png',
    description: '다른 포켓몬의 거처라 할지라도 아무렇지 않게 들어가서 쿨쿨 잘 정도로 뻔뻔하다.'
  },
  {
    id: 543,
    pokedexId: 'No.0433',
    name: '랑딸랑',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0433.png',
    description: '뛰어오르면 입안에 있는 구슬이 이리저리 부딪치며 방울 같은 음색을 만들어 낸다.'
  },
  {
    id: 544,
    pokedexId: 'No.0434',
    name: '스컹뿡',
    type1: '독',
    type2: '악',
    image: '/assets/pokemon/No.0434.png',
    description: '엉덩이에서 뿜어지는 역한 분비액의 냄새는 반경 2km까지 멀리 퍼져 주변의 포켓몬이 자리를 뜨게 한다.'
  },
  {
    id: 545,
    pokedexId: 'No.0435',
    name: '스컹탱크',
    type1: '독',
    type2: '악',
    image: '/assets/pokemon/No.0435.png',
    description: '꼬리 끝에서 심한 냄새가 나는 액체를 날려 공격하지만 위에서 공격을 받게 되면 당황한다.'
  },
  {
    id: 546,
    pokedexId: 'No.0436',
    name: '동미러',
    type1: '강철',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0436.png',
    description: '옛날 사람들은 ■■■의 등 무늬에 신비한 힘이 깃들어 있다고 믿었다.'
  },
  {
    id: 547,
    pokedexId: 'No.0437',
    name: '동탁군',
    type1: '강철',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0437.png',
    description: '비구름을 부르는 포켓몬으로 아주 옛날부터 떠받들어졌다. 가끔 땅에 묻혀 있다.'
  },
  {
    id: 548,
    pokedexId: 'No.0438',
    name: '꼬지지',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0438.png',
    description: '체내의 불필요한 수분을 눈으로 내보내 조절한다. 울고 있는 것처럼 보일 뿐이다.'
  },
  {
    id: 549,
    pokedexId: 'No.0439',
    name: '흉내내',
    type1: '에스퍼',
    type2: '페어리',
    image: '/assets/pokemon/No.0439.png',
    description: '상대의 움직임을 흉내 내는 습성이 있다. 모방을 당한 상대는 눈을 뗄 수 없게 된다고 한다.'
  },
  {
    id: 550,
    pokedexId: 'No.0440',
    name: '핑복',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0440.png',
    description: '배의 주머니에 하얗고 동그란 돌을 넣고 있다. 사이가 좋아지면 나누어 주는 일도 있다.'
  },
  {
    id: 553,
    pokedexId: 'No.0443',
    name: '딥상어동',
    type1: '드래곤',
    type2: '땅',
    image: '/assets/pokemon/No.0443.png',
    description: '구멍에 숨어서 먹이나 적이 지나가면 뛰쳐나가 문다. 기세가 대단해 이가 빠질 때도 있다.'
  },
  {
    id: 554,
    pokedexId: 'No.0444',
    name: '한바이트',
    type1: '드래곤',
    type2: '땅',
    image: '/assets/pokemon/No.0444.png',
    description: '드물게 탈피해서 비늘이 벗겨진다. 그 성분이 들어 있는 약은 피곤한 몸을 회복시켜 준다.'
  },
  {
    id: 555,
    pokedexId: 'No.0445',
    name: '한카리아스',
    type1: '드래곤',
    type2: '땅',
    image: '/assets/pokemon/No.0445.png',
    description: '고속으로 달려나가면 날개가 공기의 칼날을 만들어 내고 이로 인해 주변의 나무는 절단된다.'
  },
  {
    id: 557,
    pokedexId: 'No.0446',
    name: '먹고자',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0446.png',
    description: '매일 자신의 체중과 같은 양의 먹이가 필요하다. 맛에 대해서는 신경 쓰지 않는다.'
  },
  {
    id: 558,
    pokedexId: 'No.0447',
    name: '리오르',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0447.png',
    description: '파동을 내서 동료끼리 의사소통을 한다. 밤새도록 계속 달릴 수 있다.'
  },
  {
    id: 559,
    pokedexId: 'No.0448',
    name: '루카리오',
    type1: '격투',
    type2: '강철',
    image: '/assets/pokemon/No.0448.png',
    description: '파동을 포착하여 보이지 않는 상대의 모습도 볼 수 있다고 전해진다.'
  },
  {
    id: 561,
    pokedexId: 'No.0449',
    name: '히포포타스',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0449.png',
    description: '콧구멍을 꽉 막고 모래 속을 걸어 다니듯 이동한다. 10마리 정도가 무리 지어 생활한다.'
  },
  {
    id: 562,
    pokedexId: 'No.0450',
    name: '하마돈',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0450.png',
    description: '의외로 화를 잘 내는 포켓몬으로 입을 크게 벌려 주위에 자신의 강함을 어필한다.'
  },
  {
    id: 563,
    pokedexId: 'No.0451',
    name: '스콜피',
    type1: '독',
    type2: '벌레',
    image: '/assets/pokemon/No.0451.png',
    description: '꼬리의 발톱으로 먹이를 집어 독을 주입한다. 독이 퍼질 때까지 절대 놓치지 않는 집념이 있다.'
  },
  {
    id: 564,
    pokedexId: 'No.0452',
    name: '드래피온',
    type1: '독',
    type2: '악',
    image: '/assets/pokemon/No.0452.png',
    description: '양팔의 발톱은 자동차를 동강 내는 파괴력이 있다. 발톱의 끝에서 독을 뿌린다.'
  },
  {
    id: 565,
    pokedexId: 'No.0453',
    name: '삐딱구리',
    type1: '독',
    type2: '격투',
    image: '/assets/pokemon/No.0453.png',
    description: '독주머니를 부풀리며 울어서 주변에 으스스한 소리를 퍼트린 후 상대가 풀죽으면 독찌르기를 한다.'
  },
  {
    id: 566,
    pokedexId: 'No.0454',
    name: '독개굴',
    type1: '독',
    type2: '격투',
    image: '/assets/pokemon/No.0454.png',
    description: '유연한 몸으로 상대의 공격을 피하며 깊숙이 뛰어들어 독가시를 꿰찌른다.'
  },
  {
    id: 568,
    pokedexId: 'No.0456',
    name: '형광어',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0456.png',
    description: '몸 옆쪽에 있는 줄에 태양 빛을 모아 둘 수 있다. 밤이 되면 아름답게 빛난다.'
  },
  {
    id: 569,
    pokedexId: 'No.0457',
    name: '네오라이트',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0457.png',
    description: '빛으로 먹이를 유인하지만 천적인 사나운 물고기포켓몬까지 다가온다.'
  },
  {
    id: 570,
    pokedexId: 'No.0458',
    name: '타만타',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0458.png',
    description: '2개의 더듬이로 해수의 미묘한 움직임을 포착한다. 사람을 잘 따르는 포켓몬이다.'
  },
  {
    id: 571,
    pokedexId: 'No.0459',
    name: '눈쓰개',
    type1: '풀',
    type2: '얼음',
    image: '/assets/pokemon/No.0459.png',
    description: '추운 계절에는 산기슭까지 내려오지만 봄이 되면 눈이 남아 있는 산 정상으로 돌아간다.'
  },
  {
    id: 572,
    pokedexId: 'No.0460',
    name: '눈설왕',
    type1: '풀',
    type2: '얼음',
    image: '/assets/pokemon/No.0460.png',
    description: '만년설이 쌓인 산맥에서 조용히 지낸다. 블리자드를 발생시켜 모습을 감춘다.'
  },
  {
    id: 574,
    pokedexId: 'No.0461',
    name: '포푸니라',
    type1: '악',
    type2: '얼음',
    image: '/assets/pokemon/No.0461.png',
    description: '진화한 후 더욱 약삭빨라져 발톱으로 돌에 사인을 새겨 커뮤니케이션을 시도한다.'
  },
  {
    id: 575,
    pokedexId: 'No.0462',
    name: '자포코일',
    type1: '전기',
    type2: '강철',
    image: '/assets/pokemon/No.0462.png',
    description: '괴전파를 발신하며 하늘을 날면서 미지의 전파를 수신한다고 한다.'
  },
  {
    id: 576,
    pokedexId: 'No.0463',
    name: '내룸벨트',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0463.png',
    description: '쭉쭉 늘어나는 혓바닥으로 무엇이든 휘감는다. 함부로 다가가면 타액으로 끈적끈적거리게 된다.'
  },
  {
    id: 577,
    pokedexId: 'No.0464',
    name: '거대코뿌리',
    type1: '땅',
    type2: '바위',
    image: '/assets/pokemon/No.0464.png',
    description: '튼튼한 프로텍터가 화산의 분화로부터 보호해 준다. 둥근 바위를 손의 구멍에서 발사한다.'
  },
  {
    id: 578,
    pokedexId: 'No.0465',
    name: '덩쿠림보',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0465.png',
    description: '식물의 덩굴로 이루어진 팔을 늘여서 먹이를 포박한다. 팔을 먹혀도 아무렇지도 않다.'
  },
  {
    id: 579,
    pokedexId: 'No.0466',
    name: '에레키블',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0466.png',
    description: '흥분하면 가슴을 두들긴다. 그때마다 전기 불꽃이 튀며 천둥소리가 주변에 울려 퍼진다.'
  },
  {
    id: 580,
    pokedexId: 'No.0467',
    name: '마그마번',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0467.png',
    description: '팔 끝에서 섭씨 2000도의 불구슬을 쏘아낼 때 몸은 열 때문에 약간 하얘진다.'
  },
  {
    id: 581,
    pokedexId: 'No.0468',
    name: '토게키스',
    type1: '페어리',
    type2: '비행',
    image: '/assets/pokemon/No.0468.png',
    description: '다툼이 일어나는 장소에는 절대 나타나지 않는다. 최근에는 모습을 보기 어려워졌다.'
  },
  {
    id: 582,
    pokedexId: 'No.0469',
    name: '메가자리',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0469.png',
    description: '날개를 치는 힘이 매우 강해 힘껏 날 때는 주변의 큰 나무를 쓰러뜨린다.'
  },
  {
    id: 583,
    pokedexId: 'No.0470',
    name: '리피아',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0470.png',
    description: '맑은 날에 잠든 ■■■는 광합성을 해서 깨끗한 공기를 만들어 낸다.'
  },
  {
    id: 584,
    pokedexId: 'No.0471',
    name: '글레이시아',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0471.png',
    description: '체온을 자유자재로 컨트롤해 대기의 수분을 얼려서 다이아몬드더스트를 일으킨다.'
  },
  {
    id: 585,
    pokedexId: 'No.0472',
    name: '글라이온',
    type1: '땅',
    type2: '비행',
    image: '/assets/pokemon/No.0472.png',
    description: '적절히 바람의 흐름을 잘 타면 한 번도 날개 치는 일 없이 이 별을 일주할 수 있다.'
  },
  {
    id: 586,
    pokedexId: 'No.0473',
    name: '맘모꾸리',
    type1: '얼음',
    type2: '땅',
    image: '/assets/pokemon/No.0473.png',
    description: '1만 년 전의 얼음 밑에서 발견된 적이 있을 정도로 오랜 옛날부터 있었던 포켓몬이다.'
  },
  {
    id: 587,
    pokedexId: 'No.0474',
    name: '폴리곤Z',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0474.png',
    description: '더 우월한 포켓몬을 목표로 추가한 프로그램에 문제가 있었는지 움직임이 이상하다.'
  },
  {
    id: 588,
    pokedexId: 'No.0475',
    name: '엘레이드',
    type1: '에스퍼',
    type2: '격투',
    image: '/assets/pokemon/No.0475.png',
    description: '누군가를 지키려고 할 때는 팔꿈치를 늘여서 칼처럼 변화시키고 격렬하게 싸운다.'
  },
  {
    id: 590,
    pokedexId: 'No.0476',
    name: '대코파스',
    type1: '바위',
    type2: '강철',
    image: '/assets/pokemon/No.0476.png',
    description: '꼬마코파스라고 불리는 3개의 유닛을 자력으로 조종해 3방향에서 상대를 꼼짝 못 하게 한다.'
  },
  {
    id: 591,
    pokedexId: 'No.0477',
    name: '야느와르몽',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0477.png',
    description: '탄력 있는 몸 안에 갈 곳 없는 영혼을 가두어 저승으로 데려간다고 전해진다.'
  },
  {
    id: 592,
    pokedexId: 'No.0478',
    name: '눈여아',
    type1: '얼음',
    type2: '고스트',
    image: '/assets/pokemon/No.0478.png',
    description: '마음에 든 인간과 포켓몬을 냉기로 얼린 다음 보금자리에 가져가서 장식한다.'
  },
  {
    id: 593,
    pokedexId: 'No.0479',
    name: '로토무',
    type1: '전기',
    type2: '고스트',
    image: '/assets/pokemon/No.0479.png',
    description: '전기 같은 몸은 일부 기계에 들어갈 수 있다. 그리고 그 몸으로 장난을 친다.'
  },
  {
    id: 602,
    pokedexId: 'No.0483',
    name: '디아루가',
    type1: '강철',
    type2: '드래곤',
    image: '/assets/pokemon/No.0483.png',
    description: '시간을 조종하는 힘을 가지고 있다. 신오지방에서는 신이라고 불리며 신화에 등장한다.'
  },
  {
    id: 604,
    pokedexId: 'No.0484',
    name: '펄기아',
    type1: '물',
    type2: '드래곤',
    image: '/assets/pokemon/No.0484.png',
    description: '공간을 뒤틀리게 하는 능력을 가졌으며 신오지방의 신화에서는 신으로 묘사되고 있다.'
  },
  {
    id: 608,
    pokedexId: 'No.0487',
    name: '기라티나',
    type1: '고스트',
    type2: '드래곤',
    image: '/assets/pokemon/No.0487.png',
    description: '이 세상의 이면에 있는 세계에 살고 있다고 전해지는 포켓몬이다. 고대의 무덤에 나타난다.'
  },
  {
    id: 614,
    pokedexId: 'No.0492',
    name: '쉐이미',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0492.png',
    description: '꽃밭 속에서 살고 있지만 몸을 웅크리면 꽃처럼 보이기 때문에 누구도 눈치채지 못한다.'
  },
  {
    id: 618,
    pokedexId: 'No.0495',
    name: '주리비얀',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0495.png',
    description: '꼬리의 잎사귀로 햇빛을 받아서 에너지를 만들면 움직임이 재빨라지고 기술도 더욱 예리해진다.'
  },
  {
    id: 619,
    pokedexId: 'No.0496',
    name: '샤비',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0496.png',
    description: '낮은 자세로 풀 사이를 미끄러지듯 내달린 다음 덩굴채찍으로 자비 없이 때려눕힌다.'
  },
  {
    id: 620,
    pokedexId: 'No.0497',
    name: '샤로다',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0497.png',
    description: '햇빛으로 생성한 에너지를 기다란 몸속에서 수십 배로 증폭시킨다.'
  },
  {
    id: 621,
    pokedexId: 'No.0498',
    name: '뚜꾸리',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0498.png',
    description: '겉보기와 다르게 가벼운 몸놀림으로 상대를 농락한다. 좌우의 콧구멍에서 불덩이를 연사한다.'
  },
  {
    id: 622,
    pokedexId: 'No.0499',
    name: '차오꿀',
    type1: '불꽃',
    type2: '격투',
    image: '/assets/pokemon/No.0499.png',
    description: '싸움이 시작되면 몸을 가열한다. 체온이 급상승해서 작열하는 불덩이처럼 된다.'
  },
  {
    id: 623,
    pokedexId: 'No.0500',
    name: '염무왕',
    type1: '불꽃',
    type2: '격투',
    image: '/assets/pokemon/No.0500.png',
    description: '가슴 속에서 활활 타오르는 불꽃이 턱을 통해 기세 좋게 뿜어져 나와 마치 불꽃의 턱수염처럼 되었다.'
  },
  {
    id: 624,
    pokedexId: 'No.0501',
    name: '수댕이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0501.png',
    description: '배의 가리비칼을 작은 칼처럼 사용하여 적의 기술을 받아낸 다음 재빠르게 베어서 반격한다.'
  },
  {
    id: 625,
    pokedexId: 'No.0502',
    name: '쌍검자비',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0502.png',
    description: '두 개의 가리비칼을 물 흐르듯 다루는 모습을 본 사람들이 검술의 본보기로 삼았다고 한다.'
  },
  {
    id: 626,
    pokedexId: 'No.0503',
    name: '대검귀',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0503.png',
    description: '발도술의 전문가다. 앞발의 갑옷에 내장된 큰 검을 단번에 휘둘러서 승부를 결정짓는다.'
  },
  {
    id: 628,
    pokedexId: 'No.0504',
    name: '보르쥐',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0504.png',
    description: '볼의 주머니에 먹이를 모아두고 며칠이고 망보기를 계속한다. 꼬리로 동료에게 신호한다.'
  },
  {
    id: 629,
    pokedexId: 'No.0505',
    name: '보르그',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0505.png',
    description: '체내의 발광물질로 눈이나 몸을 빛나게 하여 습격해 온 상대를 풀이 죽게 만든다.'
  },
  {
    id: 630,
    pokedexId: 'No.0506',
    name: '요테리',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0506.png',
    description: '용감하고 신중하다. 얼굴을 덮고 있는 부드러운 털로 주변의 정보를 캐치한다.'
  },
  {
    id: 631,
    pokedexId: 'No.0507',
    name: '하데리어',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0507.png',
    description: '매우 영리하고 금방 친해진다. 인간의 파트너가 된 첫 포켓몬이라는 설도 있다.'
  },
  {
    id: 632,
    pokedexId: 'No.0508',
    name: '바랜드',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0508.png',
    description: '사람과 사는 것을 좋아하는 듯하다. 야생에서 잡아도 3일만 지나면 사람을 따르게 된다.'
  },
  {
    id: 633,
    pokedexId: 'No.0509',
    name: '쌔비냥',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0509.png',
    description: '곤란해하는 모습을 보기 위해 사람의 물건을 훔친다. 훔처우와는 라이벌 관계다.'
  },
  {
    id: 634,
    pokedexId: 'No.0510',
    name: '레파르다스',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0510.png',
    description: '아름다운 털과 스타일에 쉽게 매료되지만 변덕스럽고 흉포한 포켓몬이다.'
  },
  {
    id: 635,
    pokedexId: 'No.0511',
    name: '야나프',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0511.png',
    description: '기운이 없는 포켓몬에게 머리의 잎사귀를 나눠준다. 피로를 풀어주는 효과가 있다.'
  },
  {
    id: 636,
    pokedexId: 'No.0512',
    name: '야나키',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0512.png',
    description: '가시가 잔뜩 박힌 꼬리를 상대에게 힘껏 쳐서 공격한다. 기질이 격한 포켓몬이다.'
  },
  {
    id: 637,
    pokedexId: 'No.0513',
    name: '바오프',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0513.png',
    description: '지능이 높고 나무열매는 구운 뒤 먹는 습성이 있다. 사람 도와주기를 좋아한다.'
  },
  {
    id: 638,
    pokedexId: 'No.0514',
    name: '바오키',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0514.png',
    description: '몸속에서 태운 불꽃을 머리나 꼬리로 흩뿌려서 상대를 태운다.'
  },
  {
    id: 639,
    pokedexId: 'No.0515',
    name: '앗차프',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0515.png',
    description: '머리 송아리에 모은 물은 영양 듬뿍. 꼬리를 사용해서 그 물을 초목에 뿌린다.'
  },
  {
    id: 640,
    pokedexId: 'No.0516',
    name: '앗차키',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0516.png',
    description: '꼬리에서 발사하는 고압의 물은 콘크리트 벽도 파괴할 수 있는 위력을 지녔다.'
  },
  {
    id: 641,
    pokedexId: 'No.0517',
    name: '몽나',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0517.png',
    description: '깊은 밤중 머리맡에 나타난다. 꿈을 먹는 동안 몸에 있는 무늬가 어렴풋이 빛난다.'
  },
  {
    id: 642,
    pokedexId: 'No.0518',
    name: '몽얌나',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0518.png',
    description: '뿜어내는 연기가 거무스름할 때는 가까이 가지 않는 것이 좋다. 악몽이 현실이 되기 때문이다.'
  },
  {
    id: 643,
    pokedexId: 'No.0519',
    name: '콩둘기',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0519.png',
    description: '사람이 사는 곳에 나타난다. 먹이를 뿌려주면 수백 마리가 모여들기 때문에 주의해야 한다.'
  },
  {
    id: 644,
    pokedexId: 'No.0520',
    name: '유토브',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0520.png',
    description: '하늘을 나는 속도는 그저 그렇다. 아무리 멀리 떨어져 있어도 주인과 자신의 둥지를 기억하고 있다.'
  },
  {
    id: 645,
    pokedexId: 'No.0521',
    name: '켄호로우',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0521.png',
    description: '높은 비행 능력을 가졌다. 암컷은 지구력이 뛰어나며 수컷은 비행 속도가 뛰어나다.'
  },
  {
    id: 647,
    pokedexId: 'No.0522',
    name: '줄뮤마',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0522.png',
    description: '심장의 고동으로 전기를 만든다. 놀라서 심박수가 올라가면 전압도 같이 올라간다.'
  },
  {
    id: 648,
    pokedexId: 'No.0523',
    name: '제브라이카',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0523.png',
    description: '성질이 사납고 공격적이다. 흥분하면 갈기를 노랗게 빛내며 전격을 방출한다.'
  },
  {
    id: 649,
    pokedexId: 'No.0524',
    name: '단굴',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0524.png',
    description: '철과 비슷하게 단단하지만 오랫동안 물에 담가두면 조금 부드러워진다고 한다.'
  },
  {
    id: 650,
    pokedexId: 'No.0525',
    name: '암트르',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0525.png',
    description: '오렌지색 결정이 빛나기 시작하면 조심해야 한다. 에너지를 쏘아대기 때문이다.'
  },
  {
    id: 651,
    pokedexId: 'No.0526',
    name: '기가이어스',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0526.png',
    description: '씩씩해서 공사 현장이나 채굴장에서 대왕끼리동이나 사람과 함께 일할 때도 있다.'
  },
  {
    id: 652,
    pokedexId: 'No.0527',
    name: '또르박쥐',
    type1: '에스퍼',
    type2: '비행',
    image: '/assets/pokemon/No.0527.png',
    description: '동굴을 올려다봤을 때 벽에 하트 모양 자국이 있다면 ■■■가 살고 있다는 증거다.'
  },
  {
    id: 653,
    pokedexId: 'No.0528',
    name: '맘박쥐',
    type1: '에스퍼',
    type2: '비행',
    image: '/assets/pokemon/No.0528.png',
    description: '아주 강력한 음파를 내보낸 후에는 지쳐서 당분간 날 수 없게 된다.'
  },
  {
    id: 654,
    pokedexId: 'No.0529',
    name: '두더류',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0529.png',
    description: '시속 50km 이상의 스피드로 땅속을 헤쳐 나간다. 지상을 달리는 자동차와 견줄 만하다.'
  },
  {
    id: 655,
    pokedexId: 'No.0530',
    name: '몰드류',
    type1: '땅',
    type2: '강철',
    image: '/assets/pokemon/No.0530.png',
    description: '강철이 된 발톱과 머리로 드릴을 만들어 어떠한 두꺼운 철판도 꿰뚫는다.'
  },
  {
    id: 656,
    pokedexId: 'No.0531',
    name: '다부니',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0531.png',
    description: '귀의 더듬이로 상대의 컨디션이나 알에서 포켓몬이 언제 나올지도 알 수 있다.'
  },
  {
    id: 658,
    pokedexId: 'No.0532',
    name: '으랏차',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0532.png',
    description: '항상 각재를 들고 다니며 토목 공사를 도와준다. 자라면 큰 각재로 바꿔 든다.'
  },
  {
    id: 659,
    pokedexId: 'No.0533',
    name: '토쇠골',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0533.png',
    description: '철골을 짊어진 채 몸을 단련하고 있다. 단련한 근육을 동료와 서로 보여 주며 자랑한다.'
  },
  {
    id: 660,
    pokedexId: 'No.0534',
    name: '노보청',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0534.png',
    description: '콘크리트를 만드는 기술은 2000년 전에 ■■■에게 배운 것이라고 여겨지고 있다.'
  },
  {
    id: 661,
    pokedexId: 'No.0535',
    name: '동챙이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0535.png',
    description: '아름다운 파문이 펼쳐지는 물 아래에는 ■■■가 날카로운 소리로 울고 있다.'
  },
  {
    id: 662,
    pokedexId: 'No.0536',
    name: '두까비',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0536.png',
    description: '두통을 일으킬 정도의 음파로 먹이를 충분히 약하게 만든 뒤 끈적끈적한 혀로 포박한다.'
  },
  {
    id: 663,
    pokedexId: 'No.0537',
    name: '두빅굴',
    type1: '물',
    type2: '땅',
    image: '/assets/pokemon/No.0537.png',
    description: '전신의 혹을 진동시켜서 지진과 같은 흔들림을 일으킨다. 삐딱구리와 가까운 종이다.'
  },
  {
    id: 666,
    pokedexId: 'No.0540',
    name: '두르보',
    type1: '벌레',
    type2: '풀',
    image: '/assets/pokemon/No.0540.png',
    description: '모아머가 입혀 준 잎사귀 옷을 본보기 삼아 흉내 내어 나뭇잎을 갉아서 옷을 만든다.'
  },
  {
    id: 667,
    pokedexId: 'No.0541',
    name: '두르쿤',
    type1: '벌레',
    type2: '풀',
    image: '/assets/pokemon/No.0541.png',
    description: '나무뿌리에서 조용히 지낸다. 신선한 잎사귀보다 부드러워진 낙엽을 먹이로 선호한다.'
  },
  {
    id: 668,
    pokedexId: 'No.0542',
    name: '모아머',
    type1: '벌레',
    type2: '풀',
    image: '/assets/pokemon/No.0542.png',
    description: '온화하고 보호 본능이 강하다. 잎사귀로 된 팔은 거목을 일도양단할 정도로 예리하다.'
  },
  {
    id: 669,
    pokedexId: 'No.0543',
    name: '마디네',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0543.png',
    description: '태우지네와는 종류가 다른 동료지만 서로 만나면 큰 싸움이 된다.'
  },
  {
    id: 670,
    pokedexId: 'No.0544',
    name: '휠구',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0544.png',
    description: '고속으로 회전해 상대에게 돌격한다. 최고 시속은 약 100km에 달한다.'
  },
  {
    id: 671,
    pokedexId: 'No.0545',
    name: '펜드라',
    type1: '벌레',
    type2: '독',
    image: '/assets/pokemon/No.0545.png',
    description: '목의 가시로 먹이를 잡은 채 그대로 땅으로 내동댕이쳐서 독가시를 꽂는다.'
  },
  {
    id: 672,
    pokedexId: 'No.0546',
    name: '소미안',
    type1: '풀',
    type2: '페어리',
    image: '/assets/pokemon/No.0546.png',
    description: '■■■이 뿜는 솜을 사용한 베개와 이불은 가볍고 통기성이 좋은 고급품이다.'
  },
  {
    id: 673,
    pokedexId: 'No.0547',
    name: '엘풍',
    type1: '풀',
    type2: '페어리',
    image: '/assets/pokemon/No.0547.png',
    description: '아무리 좁은 틈이라도 바람처럼 빠져나간다. 하얀 털 뭉치를 남기고 간다.'
  },
  {
    id: 674,
    pokedexId: 'No.0548',
    name: '치릴리',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0548.png',
    description: '빠져도 바로 자라나는 머리의 잎사귀는 아주 쓰지만 갉아 먹으면 바로 기운이 난다.'
  },
  {
    id: 675,
    pokedexId: 'No.0549',
    name: '드레디어',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0549.png',
    description: '머리의 꽃 장식에서 나는 향기를 맡으면 편안해지나 손질이 아주 까다롭다.'
  },
  {
    id: 677,
    pokedexId: 'No.0550',
    name: '배쓰나이',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0550.png',
    description: '성질이 사납고 공격적이다. 생명력도 대단해서 모르는 사이에 수가 늘어나 있다.'
  },
  {
    id: 680,
    pokedexId: 'No.0551',
    name: '깜눈크',
    type1: '땅',
    type2: '악',
    image: '/assets/pokemon/No.0551.png',
    description: '모래 속에 숨어서 헤엄치는 것처럼 이동한다. 적에게 들키지 않으면서 체온이 내려가지 않기 위한 지혜다.'
  },
  {
    id: 681,
    pokedexId: 'No.0552',
    name: '악비르',
    type1: '땅',
    type2: '악',
    image: '/assets/pokemon/No.0552.png',
    description: '얇은 막으로 덮여 있는 두 눈은 한밤중에도 잘 보인다. 몇 마리가 무리 지어 생활한다.'
  },
  {
    id: 682,
    pokedexId: 'No.0553',
    name: '악비아르',
    type1: '땅',
    type2: '악',
    image: '/assets/pokemon/No.0553.png',
    description: '강력한 턱으로 물고 그대로 힘껏 몸을 비틀어 먹이를 절단한다.'
  },
  {
    id: 683,
    pokedexId: 'No.0554',
    name: '달막화',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0554.png',
    description: '몸 안에서 타오르는 불꽃이 힘의 원천이다. 불꽃이 작아지면 금세 잠들어 버린다.'
  },
  {
    id: 685,
    pokedexId: 'No.0555',
    name: '불비달마',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0555.png',
    description: '혈기왕성한 포켓몬. 굵직한 팔에서 날리는 펀치는 덤프트럭도 가루로 만들어버린다.'
  },
  {
    id: 690,
    pokedexId: 'No.0557',
    name: '돌살이',
    type1: '벌레',
    type2: '바위',
    image: '/assets/pokemon/No.0557.png',
    description: '마음에 드는 돌멩이에 구멍을 파서 보금자리로 삼는다. 단굴이나 탄동에게는 천적이다.'
  },
  {
    id: 691,
    pokedexId: 'No.0558',
    name: '암팰리스',
    type1: '벌레',
    type2: '바위',
    image: '/assets/pokemon/No.0558.png',
    description: '건조한 곳을 좋아하며 비가 내리는 날에는 바위에서 나오지 않는다. 자기 영역에 대한 의식이 강하다.'
  },
  {
    id: 692,
    pokedexId: 'No.0559',
    name: '곤율랭',
    type1: '악',
    type2: '격투',
    image: '/assets/pokemon/No.0559.png',
    description: '축 늘어난 가죽을 목까지 끌어 올려서 가드한다. 가죽이 늘어난 개체일수록 대단하다고 한다.'
  },
  {
    id: 693,
    pokedexId: 'No.0560',
    name: '곤율거니',
    type1: '악',
    type2: '격투',
    image: '/assets/pokemon/No.0560.png',
    description: '영역을 침범한 상대를 집단으로 때려눕힌다. 입에서 산성 액체를 뱉는다.'
  },
  {
    id: 695,
    pokedexId: 'No.0562',
    name: '데스마스',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0562.png',
    description: '밤마다 유적을 떠돈다. 가지고 있는 마스크는 자신이 인간이던 시절의 얼굴이라고 한다.'
  },
  {
    id: 697,
    pokedexId: 'No.0563',
    name: '데스니칸',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0563.png',
    description: '황금으로 된 반짝거리는 몸. 자신이 인간이었다는 사실을 이제는 기억하지 못할 것이다.'
  },
  {
    id: 698,
    pokedexId: 'No.0564',
    name: '프로토가',
    type1: '물',
    type2: '바위',
    image: '/assets/pokemon/No.0564.png',
    description: '골격을 조사해보니 약 1000m의 심해까지 잠수할 수 있었던 것 같다.'
  },
  {
    id: 699,
    pokedexId: 'No.0565',
    name: '늑골라',
    type1: '물',
    type2: '바위',
    image: '/assets/pokemon/No.0565.png',
    description: '단단한 등껍질을 만들기 위해 먹이의 딱딱한 껍데기나 뼈도 통째로 깨물어 먹었다.'
  },
  {
    id: 700,
    pokedexId: 'No.0566',
    name: '아켄',
    type1: '바위',
    type2: '비행',
    image: '/assets/pokemon/No.0566.png',
    description: '모든 새포켓몬의 조상이다. ■■ 자체는 아직 날지 못해 나무 위를 점프해서 이동했다.'
  },
  {
    id: 701,
    pokedexId: 'No.0567',
    name: '아케오스',
    type1: '바위',
    type2: '비행',
    image: '/assets/pokemon/No.0567.png',
    description: '날 수도 있었지만 대부분 지상을 뛰어다녔다. 그 시속은 평균 40km이다.'
  },
  {
    id: 702,
    pokedexId: 'No.0568',
    name: '깨봉이',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0568.png',
    description: '비위생적인 장소를 좋아한다. 쓰레기를 어질러놓은 채 내버려 두면 방에 나타나 그대로 눌러앉는다.'
  },
  {
    id: 703,
    pokedexId: 'No.0569',
    name: '더스트나',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0569.png',
    description: '먹은 쓰레기가 체내에서 독으로 변화한다. 먹은 쓰레기에 따라 독의 주성분도 바뀐다.'
  },
  {
    id: 705,
    pokedexId: 'No.0570',
    name: '조로아',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0570.png',
    description: '상대의 모습으로 둔갑하여 놀라게 한다. 말수가 적은 아이로 둔갑해 있을 때가 잦다고 한다.'
  },
  {
    id: 707,
    pokedexId: 'No.0571',
    name: '조로아크',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0571.png',
    description: '■■■를 잡으려 한 사람을 환영의 경치 속에 가둬서 혼내 줬다고 전해진다.'
  },
  {
    id: 709,
    pokedexId: 'No.0572',
    name: '치라미',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0572.png',
    description: '자신의 몸이나 보금자리를 청소하느라 더러워진 꼬리는 깨끗한 샘물로 하루에 걸쳐서 씻는다.'
  },
  {
    id: 710,
    pokedexId: 'No.0573',
    name: '치라치노',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0573.png',
    description: '하얀 털은 특별한 기름으로 코팅되어 있어서 상대의 공격을 흘려 버린다.'
  },
  {
    id: 711,
    pokedexId: 'No.0574',
    name: '고디탱',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0574.png',
    description: '평소에는 매우 천진난만하다. 보이지 않는 무언가를 보고 있을 때는 눈도 깜빡이지 않고 계속 말이 없다.'
  },
  {
    id: 712,
    pokedexId: 'No.0575',
    name: '고디보미',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0575.png',
    description: '아이를 최면술로 재우고는 데려가 버리기 때문에 별이 빛나는 밤에는 주의해야 한다.'
  },
  {
    id: 713,
    pokedexId: 'No.0576',
    name: '고디모아젤',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0576.png',
    description: '사이코 파워를 발산하여 상대에게 우주가 끝나는 꿈을 보여 준다. 그 꿈은 허무하고도 아름답다고 한다.'
  },
  {
    id: 714,
    pokedexId: 'No.0577',
    name: '유니란',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0577.png',
    description: '특수한 액체에 몸이 둘러싸여 있어 어떠한 환경에서도 살 수 있다.'
  },
  {
    id: 715,
    pokedexId: 'No.0578',
    name: '듀란',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0578.png',
    description: '둘로 분열된 뇌를 가지고 있어서 갑자기 다른 행동을 취할 때가 있다.'
  },
  {
    id: 716,
    pokedexId: 'No.0579',
    name: '란쿨루스',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0579.png',
    description: '사이코 파워를 사용해 특수한 액체로 만들어진 팔을 조종해서 바위를 부순다.'
  },
  {
    id: 717,
    pokedexId: 'No.0580',
    name: '꼬지보리',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0580.png',
    description: '하늘을 나는 것은 아직 서툴다. 부모 스완나의 춤을 보고 날개를 움직이는 법을 터득한다.'
  },
  {
    id: 718,
    pokedexId: 'No.0581',
    name: '스완나',
    type1: '물',
    type2: '비행',
    image: '/assets/pokemon/No.0581.png',
    description: '무리의 리더를 중심으로 일사불란하게 춤을 추며 단결력을 높인다.'
  },
  {
    id: 719,
    pokedexId: 'No.0582',
    name: '바닐프티',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0582.png',
    description: '더운 곳에서는 살 수 없다. 냉기를 뿜어 눈을 내리게 한 뒤 쌓인 눈 속에 들어가 잠든다.'
  },
  {
    id: 720,
    pokedexId: 'No.0583',
    name: '바닐리치',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0583.png',
    description: '깨끗한 물을 마셔서 얼음으로 된 몸을 크게 만든다. 날씨가 맑은 날에는 잘 발견되지 않는다.'
  },
  {
    id: 721,
    pokedexId: 'No.0584',
    name: '배바닐라',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0584.png',
    description: '분노가 정점에 달하면 눈보라를 불게 하여 적도 아군도 꽁꽁 얼려버린다.'
  },
  {
    id: 722,
    pokedexId: 'No.0585',
    name: '사철록',
    type1: '노말',
    type2: '풀',
    image: '/assets/pokemon/No.0585.png',
    description: '계절에 따라 냄새도 변한다. 초봄에는 은은하게 달콤하면서 마음이 차분해지는 향기가 난다.'
  },
  {
    id: 726,
    pokedexId: 'No.0586',
    name: '바라철록',
    type1: '노말',
    type2: '풀',
    image: '/assets/pokemon/No.0586.png',
    description: '뿔에 많은 꽃이 핀 ■■■은 꽃에 영양분을 빼앗기기 때문에 성장이 조금 늦다고 한다.'
  },
  {
    id: 731,
    pokedexId: 'No.0588',
    name: '딱정곤',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0588.png',
    description: '전기 에너지에 반응하는 이상한 체질을 지녔다. 쪼마리와 함께 있으면 진화한다.'
  },
  {
    id: 732,
    pokedexId: 'No.0589',
    name: '슈바르고',
    type1: '벌레',
    type2: '강철',
    image: '/assets/pokemon/No.0589.png',
    description: '쪼마리의 껍질을 빼앗아 완전히 무장했다. 가라르지방에서는 매우 인기가 높다.'
  },
  {
    id: 733,
    pokedexId: 'No.0590',
    name: '깜놀버슬',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0590.png',
    description: '몬스터볼의 개발자가 ■■■을 좋아했다는 설이 있지만, 진위는 불명하다.'
  },
  {
    id: 734,
    pokedexId: 'No.0591',
    name: '뽀록나',
    type1: '풀',
    type2: '독',
    image: '/assets/pokemon/No.0591.png',
    description: '내뿜는 독 포자를 조심해야 한다. 포자에 닿은 부분에서 ■■■의 갓을 닮은 버섯이 자라기 때문이다.'
  },
  {
    id: 735,
    pokedexId: 'No.0592',
    name: '탱그릴',
    type1: '물',
    type2: '고스트',
    image: '/assets/pokemon/No.0592.png',
    description: '베일과도 같은 손발로 먹이를 끌어안아 8000m 아래의 심해로 끌고 들어간다.'
  },
  {
    id: 737,
    pokedexId: 'No.0593',
    name: '탱탱겔',
    type1: '물',
    type2: '고스트',
    image: '/assets/pokemon/No.0593.png',
    description: '몸의 대부분이 바닷물과 같은 성분으로 이루어져 있다. 침몰선을 거처로 삼는다.'
  },
  {
    id: 740,
    pokedexId: 'No.0595',
    name: '파쪼옥',
    type1: '벌레',
    type2: '전기',
    image: '/assets/pokemon/No.0595.png',
    description: '거리에서 사는 ■■은 민가의 콘센트에서 전기를 빨아들이는 방법을 알고 있다.'
  },
  {
    id: 741,
    pokedexId: 'No.0596',
    name: '전툴라',
    type1: '벌레',
    type2: '전기',
    image: '/assets/pokemon/No.0596.png',
    description: '전기를 띤 실로 함정을 설치한다. 감전돼서 움직이지 못하는 먹이를 천천히 먹어 치운다.'
  },
  {
    id: 742,
    pokedexId: 'No.0597',
    name: '철시드',
    type1: '풀',
    type2: '강철',
    image: '/assets/pokemon/No.0597.png',
    description: '가시를 날려서 몸을 지킨다. 원하는 방향으로 날리기 위해서는 많은 훈련이 필요하다.'
  },
  {
    id: 743,
    pokedexId: 'No.0598',
    name: '너트령',
    type1: '풀',
    type2: '강철',
    image: '/assets/pokemon/No.0598.png',
    description: '가시로 암반에 상처를 낸 다음 촉수 끝을 이용해서 영양분을 흡수한다.'
  },
  {
    id: 744,
    pokedexId: 'No.0599',
    name: '기어르',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0599.png',
    description: '2개의 몸은 쌍둥이보다도 가깝다. 다른 몸과 있으면 제대로 맞물리지 못한다.'
  },
  {
    id: 745,
    pokedexId: 'No.0600',
    name: '기기어르',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0600.png',
    description: '전력을 다할 때는 왕기어의 바깥쪽 톱니와 꼬마기어가 맞물린다. 회전 속도를 빠르게 하기 위함이다.'
  },
  {
    id: 746,
    pokedexId: 'No.0601',
    name: '기기기어르',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0601.png',
    description: '가시 끝에서 강한 전격을 발사한다. 빨간 코어에 많은 에너지를 비축하고 있다.'
  },
  {
    id: 747,
    pokedexId: 'No.0602',
    name: '저리어',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0602.png',
    description: '한 마리의 전력은 적지만 많은 ■■가 연결되면 번개와 같은 위력이 된다.'
  },
  {
    id: 748,
    pokedexId: 'No.0603',
    name: '저리릴',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0603.png',
    description: '둥근 무늬가 발전 기관이다. 상대를 휘감은 후 무늬를 딱 붙여서 전기를 흘려보낸다.'
  },
  {
    id: 749,
    pokedexId: 'No.0604',
    name: '저리더프',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0604.png',
    description: '팔 힘으로 바다에서 기어 나와 물가에 있는 먹이를 덮친다. 한순간에 바다로 끌고 들어간다.'
  },
  {
    id: 750,
    pokedexId: 'No.0605',
    name: '리그레',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0605.png',
    description: 'TV 근처에 있으면 모니터에 기묘한 풍경이 비친다. ■■■의 고향이라 여겨지고 있다.'
  },
  {
    id: 751,
    pokedexId: 'No.0606',
    name: '벰크',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0606.png',
    description: '■■■가 나타난 목장에서는 배우르 1마리가 어느샌가 모습을 감춘다.'
  },
  {
    id: 752,
    pokedexId: 'No.0607',
    name: '불켜미',
    type1: '고스트',
    type2: '불꽃',
    image: '/assets/pokemon/No.0607.png',
    description: '평소 불꽃은 꺼져 있지만 사람이나 포켓몬의 생명력을 흡수하면 불꽃이 반짝인다.'
  },
  {
    id: 753,
    pokedexId: 'No.0608',
    name: '램프라',
    type1: '고스트',
    type2: '불꽃',
    image: '/assets/pokemon/No.0608.png',
    description: '임종 때 나타나서 영혼이 육체를 떠나면 재빨리 빨아들여 버린다.'
  },
  {
    id: 754,
    pokedexId: 'No.0609',
    name: '샹델라',
    type1: '고스트',
    type2: '불꽃',
    image: '/assets/pokemon/No.0609.png',
    description: '괴상한 불꽃으로 태워진 영혼은 갈 곳을 잃고 이승을 영원히 헤맨다.'
  },
  {
    id: 755,
    pokedexId: 'No.0610',
    name: '터검니',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0610.png',
    description: '땅속에 만든 굴에 산다. 먼 옛날 사람들은 어금니를 식칼 대신 사용했다.'
  },
  {
    id: 756,
    pokedexId: 'No.0611',
    name: '액슨도',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0611.png',
    description: '어금니는 부러지면 다시 자라지 않기 때문에 결정적인 순간에만 사용한다고 한다.'
  },
  {
    id: 757,
    pokedexId: 'No.0612',
    name: '액스라이즈',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0612.png',
    description: '동굴이나 폐광산을 거처로 쓴다. 온순하지만 어금니를 건드리면 크게 화를 내기 때문에 주의가 필요하다.'
  },
  {
    id: 758,
    pokedexId: 'No.0613',
    name: '코고미',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0613.png',
    description: '추운 지역의 바닷가에 많다. 콧물을 흘리고 있지 않으면 병에 걸렸을 수도 있다.'
  },
  {
    id: 759,
    pokedexId: 'No.0614',
    name: '툰베어',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0614.png',
    description: '육식을 하는 영악한 포켓몬. 먹이를 잡으면 냉기를 뿜어서 얼린 뒤 보관한다.'
  },
  {
    id: 761,
    pokedexId: 'No.0616',
    name: '쪼마리',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0616.png',
    description: '상대에게 공격받으면 껍질의 뚜껑을 꽉 닫아서 몸을 지킨다. 단, 딱정곤에게는 열리고 만다.'
  },
  {
    id: 762,
    pokedexId: 'No.0617',
    name: '어지리더',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0617.png',
    description: '재빠른 움직임으로 독을 날려서 싸운다. ■■■가 주인공인 영화나 만화는 인기가 많다.'
  },
  {
    id: 763,
    pokedexId: 'No.0618',
    name: '메더',
    type1: '땅',
    type2: '전기',
    image: '/assets/pokemon/No.0618.png',
    description: '갯벌이 보금자리다. 진흙 속에 사는 세균에 의해 전기를 만드는 기관이 발달했다.'
  },
  {
    id: 765,
    pokedexId: 'No.0619',
    name: '비조푸',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0619.png',
    description: '물 흐르는 듯한 연속 공격을 펼쳐서 상대를 압도한다. 날카로운 손톱으로 상대를 베어 가른다.'
  },
  {
    id: 766,
    pokedexId: 'No.0620',
    name: '비조도',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0620.png',
    description: '기묘한 울음소리를 낸다면 위험하다. 눈에 보이지도 않는 킥과 촙의 연속 공격이 시작된다.'
  },
  {
    id: 768,
    pokedexId: 'No.0622',
    name: '골비람',
    type1: '땅',
    type2: '고스트',
    image: '/assets/pokemon/No.0622.png',
    description: '환상 속 고대 문명의 과학에 의해 탄생한 포켓몬이라 여겨지고 있다.'
  },
  {
    id: 769,
    pokedexId: 'No.0623',
    name: '골루그',
    type1: '땅',
    type2: '고스트',
    image: '/assets/pokemon/No.0623.png',
    description: '가슴에 있는 봉인이 풀리면 무작정 날뛰고 다니면서 마을을 폐허로 만들어 버린다.'
  },
  {
    id: 770,
    pokedexId: 'No.0624',
    name: '자망칼',
    type1: '악',
    type2: '강철',
    image: '/assets/pokemon/No.0624.png',
    description: '강한 상대에게도 겁먹지 않고 덤빈다. 여차하면 상대에게 달라붙어서 몸에 달린 칼날로 찌른다.'
  },
  {
    id: 771,
    pokedexId: 'No.0625',
    name: '절각참',
    type1: '악',
    type2: '강철',
    image: '/assets/pokemon/No.0625.png',
    description: '자망칼을 거느리며 무리를 만든다. 영역을 건 싸움에서 진 무리는 이긴 쪽에 흡수된다.'
  },
  {
    id: 773,
    pokedexId: 'No.0627',
    name: '수리둥보',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0627.png',
    description: '무작정 싸움을 건다. 쓰러지고 다칠 때마다 강하고 늠름하게 성장한다.'
  },
  {
    id: 774,
    pokedexId: 'No.0628',
    name: '워글',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0628.png',
    description: '용맹 과감한 창공의 전사이다. 몸의 상처가 많을수록 동료에게 존경받는다고 한다.'
  },
  {
    id: 776,
    pokedexId: 'No.0629',
    name: '벌차이',
    type1: '악',
    type2: '비행',
    image: '/assets/pokemon/No.0629.png',
    description: '적당한 해골을 찾아내서 엉덩이를 방어하는 습성이 있다. 약한 포켓몬을 쫓아 돌아다닌다.'
  },
  {
    id: 777,
    pokedexId: 'No.0630',
    name: '버랜지나',
    type1: '악',
    type2: '비행',
    image: '/assets/pokemon/No.0630.png',
    description: '벌차이를 위해 언제나 먹이를 찾고 있다. 약해진 포켓몬을 발견하는 대로 둥지로 데려간다.'
  },
  {
    id: 780,
    pokedexId: 'No.0633',
    name: '모노두',
    type1: '악',
    type2: '드래곤',
    image: '/assets/pokemon/No.0633.png',
    description: '눈이 보이지 않기 때문에 무엇이든 일단 깨물어서 확인한다. 길들여지기 전까지는 상처투성이가 된다.'
  },
  {
    id: 781,
    pokedexId: 'No.0634',
    name: '디헤드',
    type1: '악',
    type2: '드래곤',
    image: '/assets/pokemon/No.0634.png',
    description: '머리끼리는 사이가 좋지 않다. 두 머리 모두 귀여워해 주지 않으면 질투하여 큰 싸움이 난다.'
  },
  {
    id: 782,
    pokedexId: 'No.0635',
    name: '삼삼드래',
    type1: '악',
    type2: '드래곤',
    image: '/assets/pokemon/No.0635.png',
    description: '본체의 머리만이 뇌를 가지고 있다. 지능은 높지만 파괴하는 일만 생각하고 있다.'
  },
  {
    id: 783,
    pokedexId: 'No.0636',
    name: '활화르바',
    type1: '벌레',
    type2: '불꽃',
    image: '/assets/pokemon/No.0636.png',
    description: '태양을 훔친 유충이라 불렸었다. 뿔을 통해 분출하는 불꽃은 철판도 끊어 버릴 수 있다.'
  },
  {
    id: 784,
    pokedexId: 'No.0637',
    name: '불카모스',
    type1: '벌레',
    type2: '불꽃',
    image: '/assets/pokemon/No.0637.png',
    description: '더운 곳에서는 타오르는 몸 때문에 미움을 받지만, 추운 곳에서는 태양의 화신이라며 받들어진다.'
  },
  {
    id: 788,
    pokedexId: 'No.0641',
    name: '토네로스',
    type1: '비행',
    type2: null,
    image: '/assets/pokemon/No.0641.png',
    description: '구름처럼 생긴 에너지체에 하반신이 둘러싸여 있다. 시속 300km로 하늘을 난다.'
  },
  {
    id: 790,
    pokedexId: 'No.0642',
    name: '볼트로스',
    type1: '전기',
    type2: '비행',
    image: '/assets/pokemon/No.0642.png',
    description: '꼬리의 가시에서 전격을 날린다. 하나지방의 하늘을 날아다니며 번개를 내리친다.'
  },
  {
    id: 794,
    pokedexId: 'No.0645',
    name: '랜드로스',
    type1: '땅',
    type2: '비행',
    image: '/assets/pokemon/No.0645.png',
    description: '■■■가 찾아온 땅에는 작물에 열매가 많이 열리기 때문에 농지의 신이라고 전해진다.'
  },
  {
    id: 796,
    pokedexId: 'No.0646',
    name: '큐레무',
    type1: '드래곤',
    type2: '얼음',
    image: '/assets/pokemon/No.0646.png',
    description: '잃어버린 몸을 진실과 이상으로 채워줄 영웅을 기다리는 얼음의 전설 포켓몬.'
  },
  {
    id: 799,
    pokedexId: 'No.0647',
    name: '케르디오',
    type1: '물',
    type2: '격투',
    image: '/assets/pokemon/No.0647.png',
    description: '바다나 강 등의 수면을 달려 세계 곳곳을 뛰어다닌다. 아름다운 물가에 나타난다.'
  },
  {
    id: 801,
    pokedexId: 'No.0648',
    name: '메로엣타',
    type1: '노말',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0648.png',
    description: '■■■가 연주하는 선율에는 주위 포켓몬을 기쁘게 하거나 슬프게 할 정도의 힘이 있다.'
  },
  {
    id: 804,
    pokedexId: 'No.0650',
    name: '도치마론',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0650.png',
    description: '박치기가 명중하기 직전에 힘을 주면 머리의 가시가 뾰족하게 날이 서 적의 몸을 꿰뚫는다.'
  },
  {
    id: 805,
    pokedexId: 'No.0651',
    name: '도치보구',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0651.png',
    description: '몸을 보호하는 튼튼한 껍질은 상당히 무겁기 때문에 자연스럽게 하체가 단련된다.'
  },
  {
    id: 806,
    pokedexId: 'No.0652',
    name: '브리가론',
    type1: '풀',
    type2: '격투',
    image: '/assets/pokemon/No.0652.png',
    description: '동료가 위기에 처했을 때는 팔의 실드를 펼침으로써 직접 방패가 되어 공격을 막는다.'
  },
  {
    id: 807,
    pokedexId: 'No.0653',
    name: '푸호꼬',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0653.png',
    description: '흥분하기 쉬운 성격이다. 체온도 과하게 오르기 때문에 귀로 열을 내보내 냉정을 유지한다.'
  },
  {
    id: 808,
    pokedexId: 'No.0654',
    name: '테르나',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0654.png',
    description: '꼬리의 나뭇가지에 붙인 불꽃을 휘둘러서 동료에게 신호를 보낸다. 위험한 순간에는 빙글빙글 돌린다.'
  },
  {
    id: 809,
    pokedexId: 'No.0655',
    name: '마폭시',
    type1: '불꽃',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0655.png',
    description: '지팡이 끝의 불꽃으로 땅에 탄 흔적을 남긴다. 옛날 사람들은 그 형태를 보고 점을 쳤다.'
  },
  {
    id: 810,
    pokedexId: 'No.0656',
    name: '개구마르',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0656.png',
    description: '태평해 보이는 것은 적을 속이기 위한 연기다. 눈에 보이지 않는 스피드로 적을 압도한다.'
  },
  {
    id: 811,
    pokedexId: 'No.0657',
    name: '개굴반장',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0657.png',
    description: '지형을 활용한 전법이 특기다. 조약돌을 거품으로 감싸서 날리는 기술은 백발백중이다.'
  },
  {
    id: 812,
    pokedexId: 'No.0658',
    name: '개굴닌자',
    type1: '물',
    type2: '악',
    image: '/assets/pokemon/No.0658.png',
    description: '목에 휘감은 기다란 혀에 닿는 공기의 흐름을 통해 보이지 않는 적의 동태를 살핀다.'
  },
  {
    id: 813,
    pokedexId: 'No.0659',
    name: '파르빗',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0659.png',
    description: '귀로 구멍을 파는 것이 특기다. 지하 10m에 달하는 굴을 하룻밤 만에 만들어버린다.'
  },
  {
    id: 814,
    pokedexId: 'No.0660',
    name: '파르토',
    type1: '노말',
    type2: '땅',
    image: '/assets/pokemon/No.0660.png',
    description: '굴착기에 뒤지지 않는 파워로 단단한 암반도 파고 들어간다. 터널 공사에서 크게 활약한다.'
  },
  {
    id: 815,
    pokedexId: 'No.0661',
    name: '화살꼬빈',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0661.png',
    description: '평소에는 온순하지만 싸움에 들어가면 호르몬의 균형이 바뀌어 공격적이게 된다.'
  },
  {
    id: 816,
    pokedexId: 'No.0662',
    name: '불화살빈',
    type1: '불꽃',
    type2: '비행',
    image: '/assets/pokemon/No.0662.png',
    description: '벌레포켓몬이 숨어 있을 것 같은 풀숲에 불똥을 흩뿌려서 튀어나오는 순간 잡아챈다.'
  },
  {
    id: 817,
    pokedexId: 'No.0663',
    name: '파이어로',
    type1: '불꽃',
    type2: '비행',
    image: '/assets/pokemon/No.0663.png',
    description: '비행 능력은 톱클래스다. 100kg 이상의 먹이를 잡은 채로도 가뿐히 날아다닌다.'
  },
  {
    id: 818,
    pokedexId: 'No.0664',
    name: '분이벌레',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0664.png',
    description: '흡수한 독소는 검은 가루로 바꿔서 배출하기 때문에 독성을 띠는 잎이나 뿌리도 먹을 수 있다.'
  },
  {
    id: 819,
    pokedexId: 'No.0665',
    name: '분떠도리',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0665.png',
    description: '수리둥보에게 부리로 쪼이면 뾰족한 털과 독성을 띠는 검은 가루로 맞서 싸운다.'
  },
  {
    id: 820,
    pokedexId: 'No.0666',
    name: '비비용',
    type1: '벌레',
    type2: '비행',
    image: '/assets/pokemon/No.0666.png',
    description: '세계에는 다양한 무늬의 날개를 가진 ■■■이 있다. 살고 있는 곳의 기후에 영향을 받는 것 같다.'
  },
  {
    id: 821,
    pokedexId: 'No.0667',
    name: '레오꼬',
    type1: '불꽃',
    type2: '노말',
    image: '/assets/pokemon/No.0667.png',
    description: '어릴 때는 암컷 화염레오에게 사냥 방법을 배우고 성장하면 무리를 떠나 독립한다.'
  },
  {
    id: 822,
    pokedexId: 'No.0668',
    name: '화염레오',
    type1: '불꽃',
    type2: '노말',
    image: '/assets/pokemon/No.0668.png',
    description: '무리의 암컷들이 협력해서 먹잇감을 처리한다. 암컷들 덕분에 무리가 굶지 않을 수 있는 것이다.'
  },
  {
    id: 824,
    pokedexId: 'No.0669',
    name: '플라베베',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0669.png',
    description: '들판에 핀 꽃에 숨겨진 힘을 끌어내는 능력을 가지고 있다. 특히 빨간 꽃을 좋아한다.'
  },
  {
    id: 825,
    pokedexId: 'No.0670',
    name: '플라엣테',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0670.png',
    description: '시든 꽃의 남은 힘을 끌어내어 건강해지게 한다. 빨간 꽃을 들고 있는 ■■■.'
  },
  {
    id: 826,
    pokedexId: 'No.0671',
    name: '플라제스',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0671.png',
    description: '자신의 영역에 멋진 화원을 만든다. 목을 감싸고 있는 빨간 꽃의 파워를 끌어낸다.'
  },
  {
    id: 827,
    pokedexId: 'No.0672',
    name: '메이클',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0672.png',
    description: '최근까지도 산악 지대에 사는 사람들은 ■■■의 등에 올라타서 산길을 이동했다.'
  },
  {
    id: 828,
    pokedexId: 'No.0673',
    name: '고고트',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0673.png',
    description: '뿔에 닿으면 상대의 기분을 느낄 수 있다. 5천 년 전부터 인간의 일을 도왔다.'
  },
  {
    id: 829,
    pokedexId: 'No.0674',
    name: '판짱',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0674.png',
    description: '형님처럼 따르는 부란다를 따라 하면서 싸우는 법과 먹이를 잡는 법을 배운다.'
  },
  {
    id: 830,
    pokedexId: 'No.0675',
    name: '부란다',
    type1: '격투',
    type2: '악',
    image: '/assets/pokemon/No.0675.png',
    description: '성질이 사나워서 완력으로 상대를 조용하게 만든다. 가로막구리와의 결투에 투지를 불태운다.'
  },
  {
    id: 832,
    pokedexId: 'No.0677',
    name: '냐스퍼',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0677.png',
    description: '체내의 강한 사이코 파워가 새어 나가지 않게 귀를 덮고 있으나 너무 오래 모아 두면 의식을 잃고 만다.'
  },
  {
    id: 833,
    pokedexId: 'No.0678',
    name: '냐오닉스',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0678.png',
    description: '어떤 상대도 날려 버릴 수 있는 사이코 파워를 가졌지만 공격할 때보다는 동료를 지킬 때 사용한다.'
  },
  {
    id: 835,
    pokedexId: 'No.0679',
    name: '단칼빙',
    type1: '강철',
    type2: '고스트',
    image: '/assets/pokemon/No.0679.png',
    description: '먼 옛날에 이 검에 의해 죽은 인간의 영혼이 ■■■의 영혼이 되었다.'
  },
  {
    id: 836,
    pokedexId: 'No.0680',
    name: '쌍검킬',
    type1: '강철',
    type2: '고스트',
    image: '/assets/pokemon/No.0680.png',
    description: '진화해서 쌍둥이가 되었다. 칼날을 맞부딪혀서 내는 금속음으로 상대를 위협한다.'
  },
  {
    id: 837,
    pokedexId: 'No.0681',
    name: '킬가르도',
    type1: '강철',
    type2: '고스트',
    image: '/assets/pokemon/No.0681.png',
    description: '강철로 된 몸과 영험한 힘을 가진 배리어로 모든 공격을 약하게 만드는 방어적인 태세.'
  },
  {
    id: 839,
    pokedexId: 'No.0682',
    name: '슈쁘',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0682.png',
    description: '체내에 있는 향기주머니로 향기를 만들어 내는 포켓몬. 먹이가 바뀌면 만들어 내는 향기도 바뀐다.'
  },
  {
    id: 840,
    pokedexId: 'No.0683',
    name: '프레프티르',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0683.png',
    description: '털에서 항상 강렬한 향기를 내보내기 때문에 파트너는 후각이 둔해지게 된다.'
  },
  {
    id: 841,
    pokedexId: 'No.0684',
    name: '나룸퍼프',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0684.png',
    description: '하루에 자신의 체중만큼의 설탕을 먹는다. 당분이 부족하면 매우 기분이 나빠진다.'
  },
  {
    id: 842,
    pokedexId: 'No.0685',
    name: '나루림',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0685.png',
    description: '체취로 몸과 마음의 상태를 알아낸다. 의료계에서 응용될 것으로 기대되고 있다.'
  },
  {
    id: 843,
    pokedexId: 'No.0686',
    name: '오케이징',
    type1: '악',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0686.png',
    description: '발광체를 깜빡여서 상대의 의욕을 상실시키는 방식으로 강적으로부터 몸을 지킨다.'
  },
  {
    id: 844,
    pokedexId: 'No.0687',
    name: '칼라마네로',
    type1: '악',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0687.png',
    description: '어마어마하게 강한 최면술을 쓴다. 조종당한 상대는 전후의 기억을 잃어버린다.'
  },
  {
    id: 845,
    pokedexId: 'No.0688',
    name: '거북손손',
    type1: '바위',
    type2: '물',
    image: '/assets/pokemon/No.0688.png',
    description: '2마리가 해변가의 적당한 바위에 달라붙어서 지낸다. 만조가 되면 협력해서 먹이를 모은다.'
  },
  {
    id: 846,
    pokedexId: 'No.0689',
    name: '거북손데스',
    type1: '바위',
    type2: '물',
    image: '/assets/pokemon/No.0689.png',
    description: '7마리의 ■■■이 1마리의 몸을 이루고 있다. 머리가 손발에 명령하는 구조다.'
  },
  {
    id: 847,
    pokedexId: 'No.0690',
    name: '수레기',
    type1: '독',
    type2: '물',
    image: '/assets/pokemon/No.0690.png',
    description: '바다에 떠 있는 해초에 섞여서 적의 눈을 속인다. 썩은 해초를 먹어서 독을 만든다.'
  },
  {
    id: 848,
    pokedexId: 'No.0691',
    name: '드래캄',
    type1: '독',
    type2: '드래곤',
    image: '/assets/pokemon/No.0691.png',
    description: '영역에 들어온 상대를 다짜고짜 독액으로 공격한다. 배의 밑바닥을 썩게 만드는 맹독을 지녔다.'
  },
  {
    id: 849,
    pokedexId: 'No.0692',
    name: '완철포',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0692.png',
    description: '오른쪽 집게 안에서 가스를 폭발시켜서 물을 발사한다. 날아가는 포켓몬을 노려 맞힐 수 있다.'
  },
  {
    id: 850,
    pokedexId: 'No.0693',
    name: '블로스터',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0693.png',
    description: '체내 가스의 힘으로 집게의 꽁지에서 물을 분사하여 60노트의 스피드로 헤엄친다.'
  },
  {
    id: 851,
    pokedexId: 'No.0694',
    name: '목도리키텔',
    type1: '전기',
    type2: '노말',
    image: '/assets/pokemon/No.0694.png',
    description: '머리에 있는 주름을 펼쳐서 태양의 빛으로 발전하면 파워풀한 전기 기술을 쓸 수 있게 된다.'
  },
  {
    id: 852,
    pokedexId: 'No.0695',
    name: '일레도리자드',
    type1: '전기',
    type2: '노말',
    image: '/assets/pokemon/No.0695.png',
    description: '과거에 멸망한 사막 나라에서 소중하게 여겼었다. 보물과 함께 가라르지방에 오게 됐다.'
  },
  {
    id: 853,
    pokedexId: 'No.0696',
    name: '티고라스',
    type1: '바위',
    type2: '드래곤',
    image: '/assets/pokemon/No.0696.png',
    description: '화석에서 부활한 포켓몬이다. 마음에 들지 않는 일이 있으면 짜증을 내며 난동을 부린다.'
  },
  {
    id: 854,
    pokedexId: 'No.0697',
    name: '견고라스',
    type1: '바위',
    type2: '드래곤',
    image: '/assets/pokemon/No.0697.png',
    description: '두꺼운 철판을 종잇장처럼 물어뜯는 커다란 턱 덕분에 고대 세계에서는 무적이었다.'
  },
  {
    id: 855,
    pokedexId: 'No.0698',
    name: '아마루스',
    type1: '바위',
    type2: '얼음',
    image: '/assets/pokemon/No.0698.png',
    description: '1억 년 전부터 빙하로 뒤덮여 있던 몸의 일부에서 부활한 고대의 포켓몬이다.'
  },
  {
    id: 856,
    pokedexId: 'No.0699',
    name: '아마루르가',
    type1: '바위',
    type2: '얼음',
    image: '/assets/pokemon/No.0699.png',
    description: '마이너스 150도의 냉기를 마름모꼴의 결정에서 내뿜어 적을 감싸 얼어붙게 한다.'
  },
  {
    id: 857,
    pokedexId: 'No.0700',
    name: '님피아',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0700.png',
    description: '리본 같은 더듬이를 통해 적의를 없애는 치유의 파동을 상대에게 보낸다.'
  },
  {
    id: 861,
    pokedexId: 'No.0704',
    name: '미끄메라',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0704.png',
    description: '몸의 대부분이 수분이다. 건조해서 말라 버리지 않도록 점막으로 전신을 뒤덮고 있다.'
  },
  {
    id: 862,
    pokedexId: 'No.0705',
    name: '미끄네일',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0705.png',
    description: '등에 달린 소용돌이 모양 돌기에 뇌나 심장과 같은 중요한 기관이 모두 들어 있다.'
  },
  {
    id: 864,
    pokedexId: 'No.0706',
    name: '미끄래곤',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0706.png',
    description: '비를 매우 좋아한다. 비가 내리는 날이면 산과 들을 거니는 모습을 볼 수 있는 온화한 성격의 포켓몬.'
  },
  {
    id: 867,
    pokedexId: 'No.0708',
    name: '나목령',
    type1: '고스트',
    type2: '풀',
    image: '/assets/pokemon/No.0708.png',
    description: '녹색 잎사귀는 만병에 듣는다는 전승이 있으나 따자마자 금방 시들어 버린다.'
  },
  {
    id: 868,
    pokedexId: 'No.0709',
    name: '대로트',
    type1: '고스트',
    type2: '풀',
    image: '/assets/pokemon/No.0709.png',
    description: '뿌리를 통해 나무들과 연결되어 숲속 구석구석을 감시한다. 수상한 자는 저주로 물리친다.'
  },
  {
    id: 869,
    pokedexId: 'No.0710',
    name: '호바귀',
    type1: '고스트',
    type2: '풀',
    image: '/assets/pokemon/No.0710.png',
    description: '이승을 떠도는 영혼은 ■■■의 몸속에 들어간 뒤 저승으로 떠난다.'
  },
  {
    id: 870,
    pokedexId: 'No.0711',
    name: '펌킨인',
    type1: '고스트',
    type2: '풀',
    image: '/assets/pokemon/No.0711.png',
    description: '한밤중에 몸속에서 들리는 기분 나쁜 울음소리는 저세상에서 고통받는 죽은 자의 울음소리라는 듯하다.'
  },
  {
    id: 871,
    pokedexId: 'No.0712',
    name: '꽁어름',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0712.png',
    description: '혹한의 산악 지대에 살지만 드물게 크레베이스의 등에 올라 바다를 건너 거처를 옮기기도 한다.'
  },
  {
    id: 872,
    pokedexId: 'No.0713',
    name: '크레베이스',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0713.png',
    description: '■■■을 태우고 걷다가 우락고래 무리를 만나면 싸움이 일어나지 않게 지나간다.'
  },
  {
    id: 874,
    pokedexId: 'No.0714',
    name: '음뱃',
    type1: '비행',
    type2: '드래곤',
    image: '/assets/pokemon/No.0714.png',
    description: '큰 귀로 초음파를 내보내서 먹이인 과일을 찾는다. 과사삭벌레를 먹이로 착각하기도 한다.'
  },
  {
    id: 875,
    pokedexId: 'No.0715',
    name: '음번',
    type1: '비행',
    type2: '드래곤',
    image: '/assets/pokemon/No.0715.png',
    description: '거대한 암석도 가루로 만드는 초음파를 발생시키는 잔인한 성격의 포켓몬.'
  },
  {
    id: 878,
    pokedexId: 'No.0718',
    name: '지가르데',
    type1: '드래곤',
    type2: '땅',
    image: '/assets/pokemon/No.0718.png',
    description: '셀이 50% 모인 모습이다. 적대하는 자는 일절 봐주지 않고 소멸시킨다.'
  },
  {
    id: 881,
    pokedexId: 'No.0719',
    name: '디안시',
    type1: '바위',
    type2: '페어리',
    image: '/assets/pokemon/No.0719.png',
    description: '멜리시의 돌연변이다. 분홍빛으로 빛나는 몸은 세계에서 가장 아름답다고 일컬어진다.'
  },
  {
    id: 883,
    pokedexId: 'No.0720',
    name: '후파',
    type1: '에스퍼',
    type2: '고스트',
    image: '/assets/pokemon/No.0720.png',
    description: '공간을 뒤트는 링으로 모든 것을 멀리 떨어진 곳으로 날려버리고 마는 트러블메이커다.'
  },
  {
    id: 886,
    pokedexId: 'No.0722',
    name: '나몰빼미',
    type1: '풀',
    type2: '비행',
    image: '/assets/pokemon/No.0722.png',
    description: '전혀 소리를 내지 않고 활공하여 적에게 빠르게 접근한다. 눈치채기 전에 강렬한 발차기를 퍼붓는다.'
  },
  {
    id: 887,
    pokedexId: 'No.0723',
    name: '빼미스로우',
    type1: '풀',
    type2: '비행',
    image: '/assets/pokemon/No.0723.png',
    description: '나르시시스트로 깔끔한 걸 좋아한다. 자주 관리해 주지 않으면 말을 안 듣기도 한다.'
  },
  {
    id: 888,
    pokedexId: 'No.0724',
    name: '모크나이퍼',
    type1: '풀',
    type2: '고스트',
    image: '/assets/pokemon/No.0724.png',
    description: '날개에 숨겨진 살깃을 시위에 메겨서 날린다. 100m 앞의 작은 돌도 관통하는 정밀함이다.'
  },
  {
    id: 890,
    pokedexId: 'No.0725',
    name: '냐오불',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0725.png',
    description: '집요하게 따라다니면 마음을 열지 않는다. 친밀해져도 과도한 스킨십은 금물이다.'
  },
  {
    id: 891,
    pokedexId: 'No.0726',
    name: '냐오히트',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0726.png',
    description: '목 주변에 불꽃의 방울이 있다. 불꽃을 뿜어낼 때 딸랑딸랑 높은 소리가 난다.'
  },
  {
    id: 892,
    pokedexId: 'No.0727',
    name: '어흥염',
    type1: '불꽃',
    type2: '악',
    image: '/assets/pokemon/No.0727.png',
    description: '투쟁심에 불이 붙으면 허리 주변에 있는 불꽃도 한층 격렬하게 타오른다.'
  },
  {
    id: 893,
    pokedexId: 'No.0728',
    name: '누리공',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0728.png',
    description: '물로 된 풍선을 조종한다. 커다란 풍선을 만들기 위해 꾸준히 연습을 반복한다.'
  },
  {
    id: 894,
    pokedexId: 'No.0729',
    name: '키요공',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0729.png',
    description: '댄스가 특기다. 춤추면서 물의 풍선을 계속 만들어 적에게 부딪친다.'
  },
  {
    id: 895,
    pokedexId: 'No.0730',
    name: '누리레느',
    type1: '물',
    type2: '페어리',
    image: '/assets/pokemon/No.0730.png',
    description: '■■■에게 싸움은 스테이지다. 화려하게 노래하고 춤을 추며 먹이의 숨통을 끊는다.'
  },
  {
    id: 896,
    pokedexId: 'No.0731',
    name: '콕코구리',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0731.png',
    description: '아무리 튼튼한 나무라도 초당 16연타의 부리 공격으로 구멍을 뚫어 버린다.'
  },
  {
    id: 897,
    pokedexId: 'No.0732',
    name: '크라파',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0732.png',
    description: '100종류의 울음소리를 구분하여 사용하면서 자신의 영역임을 어필하며 날아다닌다.'
  },
  {
    id: 898,
    pokedexId: 'No.0733',
    name: '왕큰부리',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0733.png',
    description: '부리 안에 압축된 가스를 사용해서 발사하는 씨앗은 커다란 바위도 분쇄하는 위력을 자랑한다.'
  },
  {
    id: 899,
    pokedexId: 'No.0734',
    name: '영구스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0734.png',
    description: '몸의 대부분이 위장이다. 매일 같은 경로를 배회하며 신선한 먹이를 찾는다.'
  },
  {
    id: 900,
    pokedexId: 'No.0735',
    name: '형사구스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0735.png',
    description: '먹잇감의 흔적을 발견하면 해가 떨어질 때까지 그 자리에 머물며 끈질기게 잠복한다.'
  },
  {
    id: 901,
    pokedexId: 'No.0736',
    name: '턱지충이',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0736.png',
    description: '평소에는 땅속에서 지내지만 부우부가 파헤치기 때문에 전기포켓몬 근처에 모이기도 한다.'
  },
  {
    id: 902,
    pokedexId: 'No.0737',
    name: '전지충이',
    type1: '벌레',
    type2: '전기',
    image: '/assets/pokemon/No.0737.png',
    description: '튼튼한 껍질로 몸을 보호하며 진화하기 위해 많은 양의 낙엽과 부엽토를 먹는다.'
  },
  {
    id: 903,
    pokedexId: 'No.0738',
    name: '투구뿌논',
    type1: '벌레',
    type2: '전기',
    image: '/assets/pokemon/No.0738.png',
    description: '뛰어난 기동력으로 나무 사이를 날아다니며 전자 빔으로 새포켓몬을 격추시킨다.'
  },
  {
    id: 904,
    pokedexId: 'No.0739',
    name: '오기지게',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0739.png',
    description: '나무를 때려서 떨어진 나무열매를 먹는다. 트레이닝도 되고 먹이도 구해져서 그야말로 일석이조다.'
  },
  {
    id: 905,
    pokedexId: 'No.0740',
    name: '모단단게',
    type1: '격투',
    type2: '얼음',
    image: '/assets/pokemon/No.0740.png',
    description: '떨어진 집게는 매우 맛있다. 일부러 맛보돈을 데리고 산에 올라 찾아다니는 트레이너도 있을 정도다.'
  },
  {
    id: 906,
    pokedexId: 'No.0741',
    name: '춤추새',
    type1: '불꽃',
    type2: '비행',
    image: '/assets/pokemon/No.0741.png',
    description: '정열적으로 춤추는 모습이 팔데아 사람들의 취향에 맞는지 인기가 매우 좋다.'
  },
  {
    id: 910,
    pokedexId: 'No.0742',
    name: '에블리',
    type1: '벌레',
    type2: '페어리',
    image: '/assets/pokemon/No.0742.png',
    description: '사람이나 포켓몬의 즐거워 보이는 오라를 감지하면 접근해서 긴 주둥이로 아프게 찔러 댄다.'
  },
  {
    id: 911,
    pokedexId: 'No.0743',
    name: '에리본',
    type1: '벌레',
    type2: '페어리',
    image: '/assets/pokemon/No.0743.png',
    description: '기운이 없는 사람이나 포켓몬의 감정을 감지하면 직접 만든 꽃가루경단으로 기운을 북돋워 준다.'
  },
  {
    id: 912,
    pokedexId: 'No.0744',
    name: '암멍이',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0744.png',
    description: '어렸을 때는 매우 잘 따른다. 자라면서 성질이 사나워지지만 주인에게 입은 은혜는 잊지 않는다.'
  },
  {
    id: 913,
    pokedexId: 'No.0745',
    name: '루가루암',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0745.png',
    description: '날카로운 발톱과 이빨로 먹이를 공격한다. 신뢰하는 트레이너의 지시에는 충실히 따른다.'
  },
  {
    id: 916,
    pokedexId: 'No.0746',
    name: '약어리',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0746.png',
    description: '1마리로는 너무나도 허약해서 무리를 지어 상대에게 맞서는 능력을 습득했다.'
  },
  {
    id: 918,
    pokedexId: 'No.0747',
    name: '시마사리',
    type1: '독',
    type2: '물',
    image: '/assets/pokemon/No.0747.png',
    description: '먹이를 찾아 해변을 배회한다. 부러진 찌르성게의 가시를 먹으려다 마비되어 있는 경우가 많다.'
  },
  {
    id: 919,
    pokedexId: 'No.0748',
    name: '더시마사리',
    type1: '독',
    type2: '물',
    image: '/assets/pokemon/No.0748.png',
    description: '자신의 다리로 만든 돔이 보금자리다. 조류를 뿔로 감지해서 주위를 살핀다.'
  },
  {
    id: 920,
    pokedexId: 'No.0749',
    name: '머드나기',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0749.png',
    description: '두르고 있는 진흙은 먹었던 흙을 되새김해서 만든 것이다. 장시간 햇볕을 쬐어도 마르지 않는다.'
  },
  {
    id: 921,
    pokedexId: 'No.0750',
    name: '만마드',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0750.png',
    description: '힘쓰는 일뿐만 아니라 도자기의 재료가 되는 질 좋은 진흙을 만들기 때문에 소중히 여겨져 왔다.'
  },
  {
    id: 922,
    pokedexId: 'No.0751',
    name: '물거미',
    type1: '물',
    type2: '벌레',
    image: '/assets/pokemon/No.0751.png',
    description: '머리를 감싸고 있는 수포는 점성이 있는 실로 만들어져서 터지는 일이 거의 없다.'
  },
  {
    id: 923,
    pokedexId: 'No.0752',
    name: '깨비물거미',
    type1: '물',
    type2: '벌레',
    image: '/assets/pokemon/No.0752.png',
    description: '남을 잘 돌보는 성격이다. 먹이가 아닌 ■■■도 수포로 감싸 보호하며 돌아다닌다.'
  },
  {
    id: 924,
    pokedexId: 'No.0753',
    name: '짜랑랑',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0753.png',
    description: '낮잠을 방해받는 것을 매우 싫어한다. 일광욕으로 모은 에너지로 빔을 발사할 수 있다.'
  },
  {
    id: 925,
    pokedexId: 'No.0754',
    name: '라란티스',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0754.png',
    description: '꽃의 달콤한 향기에 이끌려 찾아온 벌레포켓몬을 동료인 척 방심시키고는 낫으로 마무리한다.'
  },
  {
    id: 926,
    pokedexId: 'No.0755',
    name: '자마슈',
    type1: '풀',
    type2: '페어리',
    image: '/assets/pokemon/No.0755.png',
    description: '머리의 갓은 매우 맛있다. 숲속의 포켓몬들에게 먹히지만 하룻밤 만에 재생한다.'
  },
  {
    id: 927,
    pokedexId: 'No.0756',
    name: '마셰이드',
    type1: '풀',
    type2: '페어리',
    image: '/assets/pokemon/No.0756.png',
    description: '깜빡이는 포자의 빛으로 먹이를 유인해서 잠들게 한다. 손끝으로 생기를 흡수한다.'
  },
  {
    id: 928,
    pokedexId: 'No.0757',
    name: '야도뇽',
    type1: '독',
    type2: '불꽃',
    image: '/assets/pokemon/No.0757.png',
    description: '먹잇감을 도발해서 좁은 암석 지대로 유인한 뒤 어지러워지는 독가스를 뿜어서 마무리한다.'
  },
  {
    id: 929,
    pokedexId: 'No.0758',
    name: '염뉴트',
    type1: '독',
    type2: '불꽃',
    image: '/assets/pokemon/No.0758.png',
    description: '독가스에 어질어질해진 상대를 요염한 몸놀림으로 유혹해서 충실한 부하로 만들어 버린다.'
  },
  {
    id: 930,
    pokedexId: 'No.0759',
    name: '포곰곰',
    type1: '노말',
    type2: '격투',
    image: '/assets/pokemon/No.0759.png',
    description: '푹신푹신한 털은 감촉이 뛰어나지만 섣불리 손을 댔다간 호되게 반격을 당하고 만다.'
  },
  {
    id: 931,
    pokedexId: 'No.0760',
    name: '이븐곰',
    type1: '노말',
    type2: '격투',
    image: '/assets/pokemon/No.0760.png',
    description: '동료로 인정하면 애정을 표현하기 위해 껴안으려 하지만 뼈가 으스러질 수 있으므로 위험하다.'
  },
  {
    id: 932,
    pokedexId: 'No.0761',
    name: '달콤아',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0761.png',
    description: '과일을 졸인 것만 같은 달콤한 땀을 흘리기 때문에, 달콤한 음식이 적었던 옛날에는 매우 귀하게 여겨졌다.'
  },
  {
    id: 933,
    pokedexId: 'No.0762',
    name: '달무리나',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0762.png',
    description: '기운이 솟을 것만 같은 달콤한 향기를 흩뿌린다. 땀 억제제의 향료로 인기가 좋다.'
  },
  {
    id: 934,
    pokedexId: 'No.0763',
    name: '달코퀸',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0763.png',
    description: '자존심이 강하고 공격적이지만 꼭지의 왕관을 건드리면 금세 얌전해진다고 한다.'
  },
  {
    id: 938,
    pokedexId: 'No.0767',
    name: '꼬시레',
    type1: '벌레',
    type2: '물',
    image: '/assets/pokemon/No.0767.png',
    description: '상한 것이든 쓰레기든 닥치는 대로 먹어 치우는 자연의 청소부. 둥지 주변은 언제나 깨끗하다.'
  },
  {
    id: 939,
    pokedexId: 'No.0768',
    name: '갑주무사',
    type1: '벌레',
    type2: '물',
    image: '/assets/pokemon/No.0768.png',
    description: '이기기 위해서는 수단을 가리지 않는다. 상대의 빈틈을 찌른 뒤 앞발의 작은 발톱으로 마무리한다.'
  },
  {
    id: 940,
    pokedexId: 'No.0769',
    name: '모래꿍',
    type1: '고스트',
    type2: '땅',
    image: '/assets/pokemon/No.0769.png',
    description: '삽을 잃어버리면 나뭇가지 등을 대신 꽂고 다니며 새로운 삽을 찾을 때까지 마음을 달랜다.'
  },
  {
    id: 941,
    pokedexId: 'No.0770',
    name: '모래성이당',
    type1: '고스트',
    type2: '땅',
    image: '/assets/pokemon/No.0770.png',
    description: '작은 포켓몬을 모래로 된 몸 안으로 끌어들인 뒤, 자신이 원할 때 생기를 빨아들이는 무서운 포켓몬.'
  },
  {
    id: 943,
    pokedexId: 'No.0772',
    name: '타입:널',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0772.png',
    description: '극비였던 연구 자료가 도난당한 뒤 가라르지방에서 새로 만들어졌다는 소문이 있다.'
  },
  {
    id: 944,
    pokedexId: 'No.0773',
    name: '실버디',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0773.png',
    description: '파트너와의 강한 유대에 의해 숨겨진 능력을 각성했다. 자유자재로 타입을 바꿀 수 있다.'
  },
  {
    id: 945,
    pokedexId: 'No.0774',
    name: '메테노',
    type1: '바위',
    type2: '비행',
    image: '/assets/pokemon/No.0774.png',
    description: '오존층에서 태어나는 포켓몬. 코어를 감싸고 있는 겉껍질이 무거워지면 지상에 떨어진다.'
  },
  {
    id: 954,
    pokedexId: 'No.0782',
    name: '짜랑꼬',
    type1: '드래곤',
    type2: null,
    image: '/assets/pokemon/No.0782.png',
    description: '머리의 비늘은 공수 양면에서 활약한다. 강한 적을 상대할 때도 등을 보이지 않고 과감하게 맞선다.'
  },
  {
    id: 955,
    pokedexId: 'No.0783',
    name: '짜랑고우',
    type1: '드래곤',
    type2: '격투',
    image: '/assets/pokemon/No.0783.png',
    description: '팔의 비늘이 떨어질수록 격렬하게 싸움을 걸어온다. 비늘이 벗겨진 팔은 용기의 증표다.'
  },
  {
    id: 956,
    pokedexId: 'No.0784',
    name: '짜랑고우거',
    type1: '드래곤',
    type2: '격투',
    image: '/assets/pokemon/No.0784.png',
    description: '팔을 축 늘어뜨렸다가 순식간에 치켜드는 특유의 펀치로 상대를 하늘 높이 날려 버린다.'
  },
  {
    id: 961,
    pokedexId: 'No.0789',
    name: '코스모그',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0789.png',
    description: '연약한 가스 상태의 몸이다. 대기의 먼지를 모으며 천천히 성장한다.'
  },
  {
    id: 962,
    pokedexId: 'No.0790',
    name: '코스모움',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0790.png',
    description: '죽은 것처럼 전혀 움직이지 않지만 만지면 어렴풋이 따뜻하다. 아주 옛날에는 달의 고치로 불렸다.'
  },
  {
    id: 963,
    pokedexId: 'No.0791',
    name: '솔가레오',
    type1: '에스퍼',
    type2: '강철',
    image: '/assets/pokemon/No.0791.png',
    description: '다른 세계에 산다고 전해진다. 온몸에서 격렬한 빛을 내뿜어 깜깜한 밤도 한낮처럼 비춘다.'
  },
  {
    id: 964,
    pokedexId: 'No.0792',
    name: '루나아라',
    type1: '에스퍼',
    type2: '고스트',
    image: '/assets/pokemon/No.0792.png',
    description: '■■■가 진화한 암컷이라고 전해진다. 제3의 눈이 떠오를 때 다른 세계로 날아간다.'
  },
  {
    id: 972,
    pokedexId: 'No.0800',
    name: '네크로즈마',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0800.png',
    description: '지하에서 잠들어 있던 것 같다. 태고의 다른 세계에서 왔다고 추측되는 UB같은 생물이다.'
  },
  {
    id: 978,
    pokedexId: 'No.0803',
    name: '베베놈',
    type1: '독',
    type2: null,
    image: '/assets/pokemon/No.0803.png',
    description: '다른 세계에서는 여행 파트너로 삼을 정도로 친근한 울트라비스트다.'
  },
  {
    id: 979,
    pokedexId: 'No.0804',
    name: '아고용',
    type1: '독',
    type2: '드래곤',
    image: '/assets/pokemon/No.0804.png',
    description: '체내에 수백 리터의 독액을 갖고 있다. UB라고 불리는 생물의 일종이다.'
  },
  {
    id: 983,
    pokedexId: 'No.0808',
    name: '멜탄',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0808.png',
    description: '걸쭉하게 녹은 강철의 몸을 가졌다. 땅속의 철분이나 금속을 녹여서 흡수한다.'
  },
  {
    id: 984,
    pokedexId: 'No.0809',
    name: '멜메탈',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0809.png',
    description: '철을 만들어내는 힘을 가졌다고 추앙받았었다. 모종의 이유로 3000년의 세월이 흘러 되살아났다.'
  },
  {
    id: 986,
    pokedexId: 'No.0810',
    name: '흥나숭',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0810.png',
    description: '지니고 있는 스틱은 ■■■의 체내에서 나오는 에너지를 받아 더 단단해지고 탄력이 생긴다.'
  },
  {
    id: 987,
    pokedexId: 'No.0811',
    name: '채키몽',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0811.png',
    description: '두 개의 스틱을 능숙하게 사용해서 격렬한 비트를 만들어 낼 뿐만 아니라 싸움에서도 상대를 압도한다.'
  },
  {
    id: 988,
    pokedexId: 'No.0812',
    name: '고릴타',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0812.png',
    description: '온화한 성품을 가졌으나 조화를 해치는 자는 용서하지 않으며 반성할 때까지 엄격하게 지도한다.'
  },
  {
    id: 990,
    pokedexId: 'No.0813',
    name: '염버니',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0813.png',
    description: '전신이 따뜻해지면 본래의 힘을 발휘할 수 있다. 그러기 위해 준비 운동을 한다.'
  },
  {
    id: 991,
    pokedexId: 'No.0814',
    name: '래비풋',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0814.png',
    description: '푹신푹신한 털 덕분에 불꽃 에너지의 온도를 올리기 쉬워져서 더욱 강한 불꽃을 내보낼 수 있다.'
  },
  {
    id: 992,
    pokedexId: 'No.0815',
    name: '에이스번',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0815.png',
    description: '쉽게 흥분하는 성격이지만 신뢰하는 트레이너가 있으면 빈틈없는 전법을 구사한다.'
  },
  {
    id: 994,
    pokedexId: 'No.0816',
    name: '울머기',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0816.png',
    description: '입에서 뿜어내는 물의 탄환으로 나무열매를 떨어뜨려서 먹는다. 조준은 백발백중이다.'
  },
  {
    id: 995,
    pokedexId: 'No.0817',
    name: '누겔레온',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0817.png',
    description: '점액으로 가득한 긴 혀를 눈에 보이지 않는 속도로 뻗어서 먹잇감을 멋지게 잡아낸다.'
  },
  {
    id: 996,
    pokedexId: 'No.0818',
    name: '인텔리레온',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0818.png',
    description: '눈의 특수한 렌즈로 상대의 체온 등을 감지하고 급소를 찾아내서 공격한다.'
  },
  {
    id: 998,
    pokedexId: 'No.0819',
    name: '탐리스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0819.png',
    description: '볼에 나무열매를 비축한다. 나무열매가 없어서 입이 심심할 때는 조약돌을 물면서 견딘다.'
  },
  {
    id: 999,
    pokedexId: 'No.0820',
    name: '요씽리스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0820.png',
    description: '나무열매가 열린 나무를 발견하면 한창 싸우던 중이더라도 쏜살같이 모으러 간다.'
  },
  {
    id: 1000,
    pokedexId: 'No.0821',
    name: '파라꼬',
    type1: '비행',
    type2: null,
    image: '/assets/pokemon/No.0821.png',
    description: '용감하고 저돌적인 성질을 가졌다. 눈가의 하얀 무늬는 마음 약한 포켓몬을 기죽게 한다.'
  },
  {
    id: 1001,
    pokedexId: 'No.0822',
    name: '파크로우',
    type1: '비행',
    type2: null,
    image: '/assets/pokemon/No.0822.png',
    description: '높은 지능을 가진 이유는 뇌가 다른 새포켓몬에 비해 크기 때문이라고 전해지고 있다.'
  },
  {
    id: 1002,
    pokedexId: 'No.0823',
    name: '아머까오',
    type1: '비행',
    type2: '강철',
    image: '/assets/pokemon/No.0823.png',
    description: '비행 중에 천적에게 공격을 받으면 승객도 위험해질 수 있어서 팔데아에서는 택시로 활용할 수 없다.'
  },
  {
    id: 1004,
    pokedexId: 'No.0824',
    name: '두루지벌레',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0824.png',
    description: '언제나 부지런히 정보를 모으기 때문에 똑똑하다. 단, 힘은 그저 그렇다.'
  },
  {
    id: 1005,
    pokedexId: 'No.0825',
    name: '레돔벌레',
    type1: '벌레',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0825.png',
    description: '거의 움직이지 않지만 살아 있다. 식음을 전폐하고 껍질에 은둔하는 동안 초능력에 눈을 뜬 모양이다.'
  },
  {
    id: 1006,
    pokedexId: 'No.0826',
    name: '이올브',
    type1: '벌레',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0826.png',
    description: '똑똑한 포켓몬으로 유명하다. 커다란 두뇌는 강력한 사이코 파워를 가졌다는 증거다.'
  },
  {
    id: 1008,
    pokedexId: 'No.0827',
    name: '훔처우',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0827.png',
    description: '다른 포켓몬이 발견한 먹이를 훔치며 산다. 푹신푹신한 볼록살 덕분에 발소리가 나지 않는다.'
  },
  {
    id: 1009,
    pokedexId: 'No.0828',
    name: '폭슬라이',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0828.png',
    description: '목표로 한 먹잇감에 슬쩍 마킹을 해둔다. 냄새를 따라가다 먹이의 주인이 방심하고 있을 때 훔치려 든다.'
  },
  {
    id: 1010,
    pokedexId: 'No.0830',
    name: '꼬모카',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0830.png',
    description: '다리 하나를 땅에 꽂은 채 햇빛을 잔뜩 받으면 꽃잎이 선명한 색을 띠게 된다.'
  },
  {
    id: 1011,
    pokedexId: 'No.0830',
    name: '백솜모카',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0830.png',
    description: '솜털이 붙은 씨는 영양 만점이다. 씨를 바람에 날려서 초목과 포켓몬들을 건강하게 만든다.'
  },
  {
    id: 1012,
    pokedexId: 'No.0831',
    name: '우르',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0831.png',
    description: '곱슬곱슬한 털은 훌륭한 쿠션 역할을 한다. 절벽에서 떨어져도 아무렇지도 않다.'
  },
  {
    id: 1013,
    pokedexId: 'No.0832',
    name: '배우르',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0832.png',
    description: '탄력 있는 털로 짜낸 카펫은 트램펄린 같아서 올라가면 통통 튀어 오르게 된다.'
  },
  {
    id: 1014,
    pokedexId: 'No.0833',
    name: '깨물부기',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0833.png',
    description: '커다란 앞니는 난 지 얼마 되지 않았다. 이빨이 가려울 때는 동료의 뿔을 덥석 물면서 장난을 친다.'
  },
  {
    id: 1015,
    pokedexId: 'No.0834',
    name: '갈가부기',
    type1: '물',
    type2: '바위',
    image: '/assets/pokemon/No.0834.png',
    description: '매우 크고 뾰족뾰족한 입은 한 번 물기만 해도 암석을 부술 정도다. 성질이 매우 흉포하다.'
  },
  {
    id: 1017,
    pokedexId: 'No.0835',
    name: '멍파치',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0835.png',
    description: '달릴 때 꼬리가 시작되는 부분에서 전기를 만들어 낸다. 가라르에서는 양치기로 인기가 많다.'
  },
  {
    id: 1018,
    pokedexId: 'No.0836',
    name: '펄스멍',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0836.png',
    description: '만든 전기를 다리로 보내서 달리는 것을 돕는다. 삼 일 밤낮을 쉬지 않고 달릴 수 있다.'
  },
  {
    id: 1019,
    pokedexId: 'No.0837',
    name: '탄동',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0837.png',
    description: '맑은 날에는 초원으로 나와 달리면서 수레바퀴 같은 다리에 휘감긴 풀을 먹는다.'
  },
  {
    id: 1020,
    pokedexId: 'No.0838',
    name: '탄차곤',
    type1: '바위',
    type2: '불꽃',
    image: '/assets/pokemon/No.0838.png',
    description: '흥분하게 되면 체내의 온도가 상승하여 불꽃을 뿜으며 정신없이 달린다.'
  },
  {
    id: 1021,
    pokedexId: 'No.0839',
    name: '석탄산',
    type1: '바위',
    type2: '불꽃',
    image: '/assets/pokemon/No.0839.png',
    description: '몸을 크게 휘둘러서 타오르는 등에 있는 석탄을 주위에 흩뿌리며 위협한다.'
  },
  {
    id: 1023,
    pokedexId: 'No.0840',
    name: '과사삭벌레',
    type1: '풀',
    type2: '드래곤',
    image: '/assets/pokemon/No.0840.png',
    description: '사과의 과육을 먹으며 성장한다. 체액으로 껍질의 강도를 보강하면서 썩지 않게 한다.'
  },
  {
    id: 1024,
    pokedexId: 'No.0841',
    name: '애프룡',
    type1: '풀',
    type2: '드래곤',
    image: '/assets/pokemon/No.0841.png',
    description: '비틀비틀 날면서 틈을 노린 뒤 금속조차 녹여 버리는 강산성의 액체를 뱉어서 공격한다.'
  },
  {
    id: 1026,
    pokedexId: 'No.0842',
    name: '단지래플',
    type1: '풀',
    type2: '드래곤',
    image: '/assets/pokemon/No.0842.png',
    description: '달콤한 사과가 주식이다. 달콤한 꿀에 이끌려 찾아오는 작은 벌레포켓몬을 먹을 때도 있다.'
  },
  {
    id: 1028,
    pokedexId: 'No.0843',
    name: '모래뱀',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0843.png',
    description: '풍선처럼 늘었다 줄었다 하는 목의 주머니는 탈피를 거듭할수록 신축성이 좋아진다.'
  },
  {
    id: 1029,
    pokedexId: 'No.0844',
    name: '사다이사',
    type1: '땅',
    type2: null,
    image: '/assets/pokemon/No.0844.png',
    description: '몸을 있는 힘껏 신축시켜서 덤프트럭도 밀어 버릴 정도의 기세로 모래를 분사한다.'
  },
  {
    id: 1032,
    pokedexId: 'No.0846',
    name: '찌로꼬치',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0846.png',
    description: '직선으로만 빠르게 헤엄칠 수 있다. 너무 많이 먹어 움직임이 둔해진 녀석부터 찌리비 무리에게 노려진다.'
  },
  {
    id: 1033,
    pokedexId: 'No.0847',
    name: '꼬치조',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0847.png',
    description: '꼬리지느러미를 회전시켜서 힘차게 뛰어올라 수면 가까이 나는 갈모매를 거칠게 물어 버린다.'
  },
  {
    id: 1034,
    pokedexId: 'No.0848',
    name: '일레즌',
    type1: '전기',
    type2: '독',
    image: '/assets/pokemon/No.0848.png',
    description: '오염된 물을 마셔도 끄떡없다. 체내의 기관에서 자신에게는 무해한 독액으로 걸러 내기 때문이다.'
  },
  {
    id: 1035,
    pokedexId: 'No.0849',
    name: '스트린더',
    type1: '전기',
    type2: '독',
    image: '/assets/pokemon/No.0849.png',
    description: '독성을 띠는 땀을 흘리면서 전기를 방출할 때 주위에 기타 소리 같은 멜로디가 들린다.'
  },
  {
    id: 1039,
    pokedexId: 'No.0850',
    name: '태우지네',
    type1: '불꽃',
    type2: '벌레',
    image: '/assets/pokemon/No.0850.png',
    description: '몸속에 모아둔 가연성 가스로 열을 낸다. 특히 배 쪽의 노란 부분이 뜨겁다.'
  },
  {
    id: 1040,
    pokedexId: 'No.0851',
    name: '다태우지네',
    type1: '불꽃',
    type2: '벌레',
    image: '/assets/pokemon/No.0851.png',
    description: '발열 시의 체온은 약 800도. 몸을 채찍처럼 휘면서 덤벼든다.'
  },
  {
    id: 1042,
    pokedexId: 'No.0852',
    name: '때때무노',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0852.png',
    description: '먹이를 찾아 지상으로 올라온다. 호기심이 왕성해서 눈에 들어오는 것은 일단 촉수로 때리고 본다.'
  },
  {
    id: 1043,
    pokedexId: 'No.0853',
    name: '케오퍼스',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0853.png',
    description: '온몸이 근육덩어리다. 촉수를 사용해서 펼치는 조르기 기술의 위력은 무시무시하다.'
  },
  {
    id: 1044,
    pokedexId: 'No.0854',
    name: '데인차',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0854.png',
    description: '외롭게 죽은 자의 영혼이 마시다 남은 홍차에 깃들었다. 호텔이나 민가에 나타난다.'
  },
  {
    id: 1046,
    pokedexId: 'No.0855',
    name: '포트데스',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0855.png',
    description: '홍차로 된 몸은 독특하면서도 맛있지만 너무 마시면 죽을 수도 있다.'
  },
  {
    id: 1048,
    pokedexId: 'No.0856',
    name: '몸지브림',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0856.png',
    description: '항상 생명체의 감정이 머릿속으로 흘러들어 오기 때문에 주위에 아무도 없는 환경을 좋아한다.'
  },
  {
    id: 1049,
    pokedexId: 'No.0857',
    name: '손지브림',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0857.png',
    description: '아무리 행복한 감정일지라도 고조된 감정이라면 무엇이든 엄청난 소음으로 느낀다고 한다.'
  },
  {
    id: 1050,
    pokedexId: 'No.0858',
    name: '브리무음',
    type1: '에스퍼',
    type2: '페어리',
    image: '/assets/pokemon/No.0858.png',
    description: '거처로 삼은 숲에 들어오는 자를 빔으로 기절시킨 뒤 사이코 파워로 강화된 손톱으로 찢어발긴다.'
  },
  {
    id: 1052,
    pokedexId: 'No.0859',
    name: '메롱꿍',
    type1: '악',
    type2: '페어리',
    image: '/assets/pokemon/No.0859.png',
    description: '친해진 상대에게 장난을 치는 것은 부정한 감정을 흡수하지 못하면 자신도 짜증이 나기 때문이다.'
  },
  {
    id: 1053,
    pokedexId: 'No.0860',
    name: '쏘겨모',
    type1: '악',
    type2: '페어리',
    image: '/assets/pokemon/No.0860.png',
    description: '속여서 때리는 등 비겁한 전법을 선호하는 것은 자신의 근력에 자신이 없어서다.'
  },
  {
    id: 1054,
    pokedexId: 'No.0861',
    name: '오롱털',
    type1: '악',
    type2: '페어리',
    image: '/assets/pokemon/No.0861.png',
    description: '머리카락을 자유자재로 조종한다. 평소에는 온몸에 휘감아서 근육을 보조하는 데 쓴다.'
  },
  {
    id: 1056,
    pokedexId: 'No.0862',
    name: '가로막구리',
    type1: '악',
    type2: '노말',
    image: '/assets/pokemon/No.0862.png',
    description: '엄청난 성량을 가졌다. 샤우팅하며 위협하는 모습은 블로킹이라 불린다.'
  },
  {
    id: 1057,
    pokedexId: 'No.0863',
    name: '나이킹',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0863.png',
    description: '머리의 털이 단단해져서 철로 된 헬멧처럼 되었다. 매우 호전적인 성질을 가졌다.'
  },
  {
    id: 1058,
    pokedexId: 'No.0864',
    name: '산호르곤',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0864.png',
    description: '영력이 높아져서 껍질에서 해방되었다. 영체로 핵이 되는 영혼을 지킨다.'
  },
  {
    id: 1059,
    pokedexId: 'No.0865',
    name: '창파나이트',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0865.png',
    description: '많은 싸움에서 살아남은 자만이 이 모습으로 진화한다. 파가 시들면 전장을 떠난다.'
  },
  {
    id: 1060,
    pokedexId: 'No.0866',
    name: '마임꽁꽁',
    type1: '얼음',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0866.png',
    description: '탭 댄스의 달인이다. 얼음으로 만든 지팡이를 휘두르며 경쾌한 스텝을 선보인다.'
  },
  {
    id: 1061,
    pokedexId: 'No.0867',
    name: '데스판',
    type1: '땅',
    type2: '고스트',
    image: '/assets/pokemon/No.0867.png',
    description: '강한 저주를 담아 그린 고대의 그림이 ■■■의 영혼을 흡수해서 움직이기 시작했다.'
  },
  {
    id: 1062,
    pokedexId: 'No.0868',
    name: '마빌크',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0868.png',
    description: '달콤한 향기를 머금을수록 몸이 크게 부풀어 오르나, 에너지를 소모하면 줄어든다.'
  },
  {
    id: 1063,
    pokedexId: 'No.0869',
    name: '마휘핑',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0869.png',
    description: '■■■이 데코레이션한 디저트는 깊이 있는 달콤함을 자랑하며 먹은 사람을 행복하게 만든다.'
  },
  {
    id: 1067,
    pokedexId: 'No.0872',
    name: '누니머기',
    type1: '얼음',
    type2: '벌레',
    image: '/assets/pokemon/No.0872.png',
    description: '땅에 쌓인 눈이 먹이다. 새로 내린 부드러운 눈을 좋아해서 산꼭대기를 향해 먹으며 움직인다.'
  },
  {
    id: 1068,
    pokedexId: 'No.0873',
    name: '모스노우',
    type1: '얼음',
    type2: '벌레',
    image: '/assets/pokemon/No.0873.png',
    description: '더듬이로 대기의 흐름을 감지한다. 날개 가루에 냉기를 섞어서 눈처럼 내리게 한다.'
  },
  {
    id: 1070,
    pokedexId: 'No.0875',
    name: '빙큐보',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0875.png',
    description: '기온이 높은 날에는 동료들끼리 머리의 얼음을 맞대어 서로를 시원하게 하며 지낸다.'
  },
  {
    id: 1072,
    pokedexId: 'No.0876',
    name: '에써르',
    type1: '에스퍼',
    type2: '노말',
    image: '/assets/pokemon/No.0876.png',
    description: '다른 생명체의 긍정적인 감정을 뿔을 통해 감지하여 자신의 에너지로 삼는다.'
  },
  {
    id: 1074,
    pokedexId: 'No.0877',
    name: '모르페코',
    type1: '전기',
    type2: '악',
    image: '/assets/pokemon/No.0877.png',
    description: '항상 씨앗을 먹으며 배고픔을 억누르고 있으나, 너무 배가 고프면 성격이 거칠고 난폭해진다.'
  },
  {
    id: 1076,
    pokedexId: 'No.0878',
    name: '끼리동',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0878.png',
    description: '뾰족한 코끝으로 단단한 바위를 깎아서 먹는다. 온화해서 사람들의 힘쓰는 일을 돕는다.'
  },
  {
    id: 1077,
    pokedexId: 'No.0879',
    name: '대왕끼리동',
    type1: '강철',
    type2: null,
    image: '/assets/pokemon/No.0879.png',
    description: '과거 먼 곳에서 인간들이 데리고 왔다. 비행기도 가볍게 끌어당기는 천하장사.'
  },
  {
    id: 1083,
    pokedexId: 'No.0884',
    name: '두랄루돈',
    type1: '강철',
    type2: '드래곤',
    image: '/assets/pokemon/No.0884.png',
    description: '특수한 금속으로 된 몸은 경면 가공을 한 것처럼 매끈하다. 흠집도 잘 안 나는 데다 가볍다.'
  },
  {
    id: 1085,
    pokedexId: 'No.0885',
    name: '드라꼰',
    type1: '드래곤',
    type2: '고스트',
    image: '/assets/pokemon/No.0885.png',
    description: '해 질 녘에 무리 지어 바다 위를 고속으로 돌아다니며 물속의 포켓몬을 쪼면서 논다.'
  },
  {
    id: 1086,
    pokedexId: 'No.0886',
    name: '드래런치',
    type1: '드래곤',
    type2: '고스트',
    image: '/assets/pokemon/No.0886.png',
    description: '시속 200km로 날아다닌다. 싸움에서 지면 ■■■은 금세 어딘가로 가 버린다.'
  },
  {
    id: 1087,
    pokedexId: 'No.0887',
    name: '드래펄트',
    type1: '드래곤',
    type2: '고스트',
    image: '/assets/pokemon/No.0887.png',
    description: '신경을 곤두세우면 온몸을 투명하게 만들 수 있다. 뿔 안의 ■■■도 보이지 않게 된다.'
  },
  {
    id: 1088,
    pokedexId: 'No.0888',
    name: '자시안',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0888.png',
    description: '전설의 영웅이라고 불리는 포켓몬. 금속을 흡수한 뒤 무기로 변화시켜서 싸운다.'
  },
  {
    id: 1090,
    pokedexId: 'No.0889',
    name: '자마젠타',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0889.png',
    description: '인간의 왕과 힘을 합쳐 가라르를 구한 포켓몬. 금속을 흡수해서 싸운다.'
  },
  {
    id: 1093,
    pokedexId: 'No.0891',
    name: '치고마',
    type1: '격투',
    type2: null,
    image: '/assets/pokemon/No.0891.png',
    description: '혹독한 수련을 거듭하며 기술을 갈고닦는다. 체득한 기술에 따라 진화했을 때의 모습이 달라진다.'
  },
  {
    id: 1094,
    pokedexId: 'No.0892',
    name: '우라오스',
    type1: '격투',
    type2: '악',
    image: '/assets/pokemon/No.0892.png',
    description: '일격필살이 신조다. 상대의 품으로 파고들어 단련된 주먹을 질러 넣는다.'
  },
  {
    id: 1103,
    pokedexId: 'No.0898',
    name: '버드렉스',
    type1: '에스퍼',
    type2: '풀',
    image: '/assets/pokemon/No.0898.png',
    description: '치유와 은총의 힘을 가진 자애로운 포켓몬. 먼 옛날 가라르에 군림했었다.'
  },
  {
    id: 1106,
    pokedexId: 'No.0899',
    name: '신비록',
    type1: '노말',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0899.png',
    description: '눈에 보이지 않는 벽을 만들어 낼 때 검은 구슬이 신비하게 빛난다. 떨어진 수염은 따뜻해서 겨울옷의 귀중한 재료가 된다.'
  },
  {
    id: 1107,
    pokedexId: 'No.0900',
    name: '사마자르',
    type1: '벌레',
    type2: '바위',
    image: '/assets/pokemon/No.0900.png',
    description: '화산 지대에서 매우 드물게 발견되는 광석에 의해 몸의 일부가 바위로 변하는 진화를 이뤄 냈다.'
  },
  {
    id: 1108,
    pokedexId: 'No.0901',
    name: '다투곰',
    type1: '땅',
    type2: '노말',
    image: '/assets/pokemon/No.0901.png',
    description: '히스이 땅에 펼쳐진 습지의 토양 덕분에 튼튼한 몸과 함께, 이탄을 자유롭게 다루는 새로운 재주를 익히게 된 것으로 추측된다.'
  },
  {
    id: 1110,
    pokedexId: 'No.0902',
    name: '대쓰여너',
    type1: '물',
    type2: '고스트',
    image: '/assets/pokemon/No.0902.png',
    description: '태어난 강으로 향하는 가혹한 여정 중에 목숨을 잃은 동료들의 영혼을 몸에 두르고 있다.'
  },
  {
    id: 1112,
    pokedexId: 'No.0903',
    name: '포푸니크',
    type1: '격투',
    type2: '독',
    image: '/assets/pokemon/No.0903.png',
    description: '다른 종을 압도하는 신체 능력과 맹독을 가지고 있어 한랭한 고지대에서는 맞수가 없다. 무리를 이루지 않고 고독함을 즐긴다.'
  },
  {
    id: 1113,
    pokedexId: 'No.0904',
    name: '장침바루',
    type1: '악',
    type2: '독',
    image: '/assets/pokemon/No.0904.png',
    description: '잠들어 있는 동안에도 움직이는 물체가 접근하면 독침이 무의식적으로 반응해서 꿰뚫어 버린다.'
  },
  {
    id: 1114,
    pokedexId: 'No.0905',
    name: '러브로스',
    type1: '페어리',
    type2: '비행',
    image: '/assets/pokemon/No.0905.png',
    description: '바다를 건너 날아와 혹독한 겨울의 끝을 알린다. 자애로움이 히스이 땅에 새로운 생명을 싹틔우게 했다는 전승이 있다.'
  },
  {
    id: 1116,
    pokedexId: 'No.0906',
    name: '나오하',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0906.png',
    description: '복슬복슬한 털은 식물에 가까운 성분으로 이루어져 있다. 수시로 세수를 하면서 건조해지는 것을 방지한다.'
  },
  {
    id: 1117,
    pokedexId: 'No.0907',
    name: '나로테',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0907.png',
    description: '긴 털 아래 숨긴 덩굴을 능숙하게 다뤄서 단단한 꽃봉오리로 상대를 가격한다.'
  },
  {
    id: 1118,
    pokedexId: 'No.0908',
    name: '마스카나',
    type1: '풀',
    type2: '악',
    image: '/assets/pokemon/No.0908.png',
    description: '꽃이 떠 있는 것처럼 보이는 것은 망토 뒷면의 털이 빛을 반사해서 줄기를 보이지 않게 하기 때문이다.'
  },
  {
    id: 1119,
    pokedexId: 'No.0909',
    name: '뜨아거',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0909.png',
    description: '따뜻한 바위 위에 드러누워서 네모난 비늘을 통해 흡수한 열로 불꽃 에너지를 만든다.'
  },
  {
    id: 1120,
    pokedexId: 'No.0910',
    name: '악뜨거',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0910.png',
    description: '불꽃 에너지와 남아도는 생명력이 섞여서 머리 위에 알 모양의 불덩이가 생겨났다.'
  },
  {
    id: 1121,
    pokedexId: 'No.0911',
    name: '라우드본',
    type1: '불꽃',
    type2: '고스트',
    image: '/assets/pokemon/No.0911.png',
    description: '노랫소리에 따라 모습이 바뀌는 불새는 머리 위에 있던 불덩이에 영혼이 깃든 것이라고 한다.'
  },
  {
    id: 1122,
    pokedexId: 'No.0912',
    name: '꾸왁스',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0912.png',
    description: '옛날에 머나먼 땅에서 찾아와 정착했다. 날개에서 분비되는 젤은 물과 먼지를 튕겨 낸다.'
  },
  {
    id: 1123,
    pokedexId: 'No.0913',
    name: '아꾸왁',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0913.png',
    description: '열심히 얕은 여울을 달리며 하반신을 단련하고, 동료들끼리 발 기술의 화려함을 겨룬다.'
  },
  {
    id: 1124,
    pokedexId: 'No.0914',
    name: '웨이니발',
    type1: '물',
    type2: '격투',
    image: '/assets/pokemon/No.0914.png',
    description: '발차기 한 번에 트럭을 굴려 버릴 정도로 강한 다릿심을 활용하여 이국적인 춤을 선보인다.'
  },
  {
    id: 1125,
    pokedexId: 'No.0915',
    name: '맛보돈',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0915.png',
    description: '하루 종일 먹이를 찾는다. 뛰어난 후각을 가졌지만 먹이를 찾는 일 외에는 사용하지 않는다.'
  },
  {
    id: 1126,
    pokedexId: 'No.0916',
    name: '퍼퓨돈',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0916.png',
    description: '곱고 윤기가 흐르는 피부를 자랑한다. 꼬리 끝에서 응축된 향기를 내보낸다.'
  },
  {
    id: 1128,
    pokedexId: 'No.0917',
    name: '타랜툴라',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0917.png',
    description: '몸을 감싸고 있는 실타래는 천적인 스라크의 낫을 튕겨 낼 정도의 탄력을 자랑한다.'
  },
  {
    id: 1129,
    pokedexId: 'No.0918',
    name: '트래피더',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0918.png',
    description: '나뭇가지나 천장에 실로 달라붙어 소리 없이 행동한다. 먹잇감에게 들키기 전에 쓰러뜨린다.'
  },
  {
    id: 1130,
    pokedexId: 'No.0919',
    name: '콩알뚜기',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0919.png',
    description: '제3의 다리가 접혀 있다. 위기에 처하면 10m 이상을 점프하는 다릿심을 가지고 있다.'
  },
  {
    id: 1131,
    pokedexId: 'No.0920',
    name: '엑스레그',
    type1: '벌레',
    type2: '악',
    image: '/assets/pokemon/No.0920.png',
    description: '진심을 다하게 되면 접었던 다리로 일어나 결전 모드로 변하여 단시간에 적을 제압한다.'
  },
  {
    id: 1132,
    pokedexId: 'No.0921',
    name: '빠모',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0921.png',
    description: '볼의 전기 주머니가 아직 발달하지 않았다. 앞발의 볼록살을 열심히 비벼야 겨우 전기가 만들어진다.'
  },
  {
    id: 1133,
    pokedexId: 'No.0922',
    name: '빠모트',
    type1: '전기',
    type2: '격투',
    image: '/assets/pokemon/No.0922.png',
    description: '무리가 공격을 받으면 전격을 날리는 격투기로 먼저 싸움을 걸고 적을 쓰러뜨린다.'
  },
  {
    id: 1134,
    pokedexId: 'No.0923',
    name: '빠르모트',
    type1: '전기',
    type2: '격투',
    image: '/assets/pokemon/No.0923.png',
    description: '평소에는 느긋하지만 싸움이 시작되면 전광석화와도 같은 몸놀림으로 적을 때려눕힌다.'
  },
  {
    id: 1135,
    pokedexId: 'No.0924',
    name: '두리쥐',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0924.png',
    description: '호흡이 척척 맞는 콤비네이션으로 집의 재료가 될 만한 것을 앞니로 잘라 내어 가지고 간다.'
  },
  {
    id: 1136,
    pokedexId: 'No.0925',
    name: '파밀리쥐',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0925.png',
    description: '잠을 자는 곳이나 먹이를 먹는 곳 등, 용도에 따라 나눈 여러 개의 방으로 구성된 커다란 집을 만든다.'
  },
  {
    id: 1138,
    pokedexId: 'No.0926',
    name: '쫀도기',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0926.png',
    description: '만지면 촉촉하고 매끈매끈하다. 숨결에 포함되어 있는 효모로 주위의 것들을 발효시킨다.'
  },
  {
    id: 1139,
    pokedexId: 'No.0927',
    name: '바우첼',
    type1: '페어리',
    type2: null,
    image: '/assets/pokemon/No.0927.png',
    description: '몸에서 나는 좋은 향기가 밀의 성장을 돕기 때문에 농촌에서 소중히 여겨진다.'
  },
  {
    id: 1140,
    pokedexId: 'No.0928',
    name: '미니브',
    type1: '풀',
    type2: '노말',
    image: '/assets/pokemon/No.0928.png',
    description: '머리의 열매에서 오일을 나오게 해서 적으로부터 몸을 지킨다. 오일은 펄쩍 뛸 만큼 떫고 쓰다.'
  },
  {
    id: 1141,
    pokedexId: 'No.0929',
    name: '올리뇨',
    type1: '풀',
    type2: '노말',
    image: '/assets/pokemon/No.0929.png',
    description: '신선한 향기가 나는 맛있는 오일을 나눠 준다. 오래전부터 인간과 공존해 왔다.'
  },
  {
    id: 1142,
    pokedexId: 'No.0930',
    name: '올리르바',
    type1: '풀',
    type2: '노말',
    image: '/assets/pokemon/No.0930.png',
    description: '온화하면서도 매우 자비롭다. 영양이 풍부한 맛있는 오일을 약해진 포켓몬에게 나눠 준다.'
  },
  {
    id: 1143,
    pokedexId: 'No.0931',
    name: '시비꼬',
    type1: '노말',
    type2: '비행',
    image: '/assets/pokemon/No.0931.png',
    description: '마을에서 사는 것을 선호한다. 깃털 색에 따라 그룹을 만들고는 영역 다툼을 벌인다.'
  },
  {
    id: 1147,
    pokedexId: 'No.0932',
    name: '베베솔트',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0932.png',
    description: '땅속의 암염층에서 태어났다. 귀한 소금을 나눠 주기 때문에 옛날에는 특히 더 귀하게 여겨졌다.'
  },
  {
    id: 1148,
    pokedexId: 'No.0933',
    name: '스태솔트',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0933.png',
    description: '분출한 소금을 먹이에게 끼얹어서 소금절이로 만들어 버린다. 체내의 수분을 빼앗는 것이다.'
  },
  {
    id: 1149,
    pokedexId: 'No.0934',
    name: '콜로솔트',
    type1: '바위',
    type2: null,
    image: '/assets/pokemon/No.0934.png',
    description: '손끝을 문질러서 나온 소금을 다친 포켓몬에게 뿌리면 심한 상처도 금방 낫는다.'
  },
  {
    id: 1150,
    pokedexId: 'No.0935',
    name: '카르본',
    type1: '불꽃',
    type2: null,
    image: '/assets/pokemon/No.0935.png',
    description: '불탄 숯에 영혼이 깃들어서 포켓몬이 되었다. 타오르는 투지로 강한 상대에게도 싸움을 건다.'
  },
  {
    id: 1151,
    pokedexId: 'No.0936',
    name: '카디나르마',
    type1: '불꽃',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0936.png',
    description: '많은 무공을 세운 전사의 갑옷에 의해 진화한 모습. 충성심이 강한 포켓몬이다.'
  },
  {
    id: 1152,
    pokedexId: 'No.0937',
    name: '파라블레이즈',
    type1: '불꽃',
    type2: '고스트',
    image: '/assets/pokemon/No.0937.png',
    description: '양팔의 불꽃 검은 뜻을 다 이루지 못한 채 스러진 검사의 원념에 의해 타오르고 있다.'
  },
  {
    id: 1153,
    pokedexId: 'No.0938',
    name: '빈나두',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0938.png',
    description: '꼬리를 흔들어서 전기를 발생시킨다. 위험을 감지하면 머리를 깜빡여서 동료에게 알린다.'
  },
  {
    id: 1154,
    pokedexId: 'No.0939',
    name: '찌리배리',
    type1: '전기',
    type2: null,
    image: '/assets/pokemon/No.0939.png',
    description: '말랑말랑한 몸을 늘였다 줄였다 하면 배에 달린 배꼽 발전기가 큰 전력을 발생시킨다.'
  },
  {
    id: 1155,
    pokedexId: 'No.0940',
    name: '찌리비',
    type1: '전기',
    type2: '비행',
    image: '/assets/pokemon/No.0940.png',
    description: '날개의 뼈는 바람을 받으면 전기를 만들어 낸다. 바다에 뛰어들어 먹이를 감전시켜서 잡는다.'
  },
  {
    id: 1156,
    pokedexId: 'No.0941',
    name: '찌리비크',
    type1: '전기',
    type2: '비행',
    image: '/assets/pokemon/No.0941.png',
    description: '목의 주머니를 부풀려서 전기를 증폭시킨다. 바람을 타고 하루에 700km를 비행할 수 있다.'
  },
  {
    id: 1157,
    pokedexId: 'No.0942',
    name: '오라티프',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0942.png',
    description: '상대에게 얕보이지 않기 위해 항상 얼굴을 찌푸리고 있지만 우는 아이는 그 모습을 보고 웃게 된다.'
  },
  {
    id: 1158,
    pokedexId: 'No.0943',
    name: '마피티프',
    type1: '악',
    type2: null,
    image: '/assets/pokemon/No.0943.png',
    description: '커다란 목 주머니에 에너지를 비축할 수 있다. 단숨에 이를 방출하여 적을 날려 버린다.'
  },
  {
    id: 1159,
    pokedexId: 'No.0944',
    name: '땃쭈르',
    type1: '독',
    type2: '노말',
    image: '/assets/pokemon/No.0944.png',
    description: '온화하지만 화가 나게 하면 독이 밴 날카로운 앞니로 물어서 상대를 마비시킨다.'
  },
  {
    id: 1160,
    pokedexId: 'No.0945',
    name: '태깅구르',
    type1: '독',
    type2: '노말',
    image: '/assets/pokemon/No.0945.png',
    description: '먹이에 따라 색이 변하는 독성의 침을 손가락에 묻혀서 숲의 나무들에 무늬를 그린다.'
  },
  {
    id: 1161,
    pokedexId: 'No.0946',
    name: '그푸리',
    type1: '풀',
    type2: '고스트',
    image: '/assets/pokemon/No.0946.png',
    description: '성불하지 못한 영혼이 바람에 날리다가 마른 풀과 엉키면서 포켓몬이 되었다.'
  },
  {
    id: 1162,
    pokedexId: 'No.0947',
    name: '공푸리',
    type1: '풀',
    type2: '고스트',
    image: '/assets/pokemon/No.0947.png',
    description: '머리의 가지를 열어서 먹이를 삼킨다. 생기를 실컷 흡수한 다음 그대로 뱉어 버린다.'
  },
  {
    id: 1163,
    pokedexId: 'No.0948',
    name: '들눈해',
    type1: '땅',
    type2: '풀',
    image: '/assets/pokemon/No.0948.png',
    description: '축축한 숲속에 산다. 떨어져 나온 몸의 하늘하늘한 부분은 쫄깃쫄깃하고 아주 맛있다.'
  },
  {
    id: 1164,
    pokedexId: 'No.0949',
    name: '육파리',
    type1: '땅',
    type2: '풀',
    image: '/assets/pokemon/No.0949.png',
    description: '깊은 숲속에 집단으로 살며 군체를 형성한다. 외부인이 접근하는 것을 극도로 싫어한다.'
  },
  {
    id: 1166,
    pokedexId: 'No.0951',
    name: '캡싸이',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.0951.png',
    description: '태양 빛을 쬐면 쬘수록 체내의 매운 성분이 늘어나서 기술이 점점 더 매워진다.'
  },
  {
    id: 1167,
    pokedexId: 'No.0952',
    name: '스코빌런',
    type1: '풀',
    type2: '불꽃',
    image: '/assets/pokemon/No.0952.png',
    description: '레드 헤드가 매운 성분을 불꽃 에너지로 변환시켜 불같이 매운 화염방사를 사방에 흩뿌린다.'
  },
  {
    id: 1168,
    pokedexId: 'No.0953',
    name: '구르데',
    type1: '벌레',
    type2: null,
    image: '/assets/pokemon/No.0953.png',
    description: '에스퍼 에너지를 섞어서 흙과 모래로 진흙구슬을 만든다. 진흙구슬을 목숨보다 소중히 여긴다.'
  },
  {
    id: 1169,
    pokedexId: 'No.0954',
    name: '베라카스',
    type1: '벌레',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0954.png',
    description: '구슬을 지탱하는 몸은 거의 움직이지 않기 때문에, 구슬 안에 본체가 있는 것으로 여겨지고 있다.'
  },
  {
    id: 1170,
    pokedexId: 'No.0955',
    name: '하느라기',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0955.png',
    description: '배의 하늘하늘한 부분에서 나오는 사이코 파워를 통해, 겨우 1cm지만 발끝이 지상에 떠 있다.'
  },
  {
    id: 1171,
    pokedexId: 'No.0956',
    name: '클레스퍼트라',
    type1: '에스퍼',
    type2: null,
    image: '/assets/pokemon/No.0956.png',
    description: '커다란 눈동자에서 사이코 파워를 발산하여 상대를 움직일 수 없게 한다. 겉보기와 다르게 성질이 사납다.'
  },
  {
    id: 1172,
    pokedexId: 'No.0957',
    name: '어리짱',
    type1: '페어리',
    type2: '강철',
    image: '/assets/pokemon/No.0957.png',
    description: '손수 만든 해머를 휘둘러 몸을 지키려 하나 금속을 먹는 포켓몬에게 자주 빼앗기고 만다.'
  },
  {
    id: 1173,
    pokedexId: 'No.0958',
    name: '벼리짱',
    type1: '페어리',
    type2: '강철',
    image: '/assets/pokemon/No.0958.png',
    description: '크고 튼튼한 해머를 만들기 위해 절각참 무리를 습격해서 금속을 모은다.'
  },
  {
    id: 1174,
    pokedexId: 'No.0959',
    name: '두드리짱',
    type1: '페어리',
    type2: '강철',
    image: '/assets/pokemon/No.0959.png',
    description: '지능이 높고 매우 호쾌하다. 해머로 바위를 날려서 하늘을 나는 아머까오를 노린다.'
  },
  {
    id: 1175,
    pokedexId: 'No.0960',
    name: '바다그다',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0960.png',
    description: '20m 떨어진 가비루사에게서 나는 냄새도 맡을 수 있어서 모래 속에 몸을 숨긴다.'
  },
  {
    id: 1176,
    pokedexId: 'No.0961',
    name: '바닥트리오',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0961.png',
    description: '겉보기와 다르게 성질이 사납다. 기다란 몸으로 먹잇감을 죄어서 굴 안으로 끌고 들어간다.'
  },
  {
    id: 1178,
    pokedexId: 'No.0963',
    name: '맨돌핀',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0963.png',
    description: '꼬리지느러미에 있는 물의 고리를 가지고 동료와 노는 것을 좋아한다. 초음파로 생명체의 기분을 감지한다.'
  },
  {
    id: 1179,
    pokedexId: 'No.0964',
    name: '돌핀맨',
    type1: '물',
    type2: null,
    image: '/assets/pokemon/No.0964.png',
    description: '도움을 구하는 동료의 소리를 들으면 모습을 바꾼다. 그 순간은 누구에게도 보여 주지 않는다.'
  },
  {
    id: 1181,
    pokedexId: 'No.0965',
    name: '부르롱',
    type1: '강철',
    type2: '독',
    image: '/assets/pokemon/No.0965.png',
    description: '고철 처리장에 방치된 엔진에 정체불명의 독포켓몬이 들어가 탄생한 것으로 전해지고 있다.'
  },
  {
    id: 1182,
    pokedexId: 'No.0966',
    name: '부르르룸',
    type1: '강철',
    type2: '독',
    image: '/assets/pokemon/No.0966.png',
    description: '독소와 바위 성분이 섞인 가스를 8개로 늘어난 실린더에서 폭발시켜 에너지를 만들어 낸다.'
  },
  {
    id: 1185,
    pokedexId: 'No.0969',
    name: '초롱순',
    type1: '바위',
    type2: '독',
    image: '/assets/pokemon/No.0969.png',
    description: '동굴의 벽에서 영양분을 흡수한다. 독의 결정으로 만들어진 꽃잎을 몸에 두르고 있다.'
  },
  {
    id: 1186,
    pokedexId: 'No.0970',
    name: '킬라플로르',
    type1: '바위',
    type2: '독',
    image: '/assets/pokemon/No.0970.png',
    description: '위험을 감지하면 결정으로 된 꽃잎을 펼친 뒤 원뿔 모양의 몸에서 빔을 발사한다.'
  },
  {
    id: 1187,
    pokedexId: 'No.0971',
    name: '망망이',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0971.png',
    description: '사람과의 접점 없이 숨을 거둔 들개포켓몬이 환생한 것으로 여겨지고 있다.'
  },
  {
    id: 1188,
    pokedexId: 'No.0972',
    name: '묘두기',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0972.png',
    description: '평소에는 묘지에서 자고 있다. 수많은 개포켓몬 중에서도 가장 주인에게 충직하다.'
  },
  {
    id: 1190,
    pokedexId: 'No.0974',
    name: '터벅고래',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0974.png',
    description: '먼 옛날에 바다에서 올라와 육지에 살게 되었다. 고래왕자의 근연종이라고 한다.'
  },
  {
    id: 1191,
    pokedexId: 'No.0975',
    name: '우락고래',
    type1: '얼음',
    type2: null,
    image: '/assets/pokemon/No.0975.png',
    description: '빙설 지대를 떼 지어 다닌다. 강인한 근육과 두꺼운 피하지방으로 몸을 보호한다.'
  },
  {
    id: 1194,
    pokedexId: 'No.0978',
    name: '싸리용',
    type1: '드래곤',
    type2: '물',
    image: '/assets/pokemon/No.0978.png',
    description: '작은 몸집의 드래곤포켓몬. 어써러셔의 입안에 살며 외부의 적으로부터 몸을 지킨다.'
  },
  {
    id: 1197,
    pokedexId: 'No.0979',
    name: '저승갓숭',
    type1: '격투',
    type2: '고스트',
    image: '/assets/pokemon/No.0979.png',
    description: '분노의 볼티지가 임계점을 돌파하면서 육체라는 틀에 얽매이지 않는 파워를 손에 넣게 되었다.'
  },
  {
    id: 1198,
    pokedexId: 'No.0980',
    name: '토오',
    type1: '독',
    type2: '땅',
    image: '/assets/pokemon/No.0980.png',
    description: '적에게 공격을 받으면 몸에서 굵은 가시를 내지르며 반격한다. 몸이 끊어질 각오가 필요한 위험한 기술이다.'
  },
  {
    id: 1199,
    pokedexId: 'No.0981',
    name: '키키링',
    type1: '노말',
    type2: '에스퍼',
    image: '/assets/pokemon/No.0981.png',
    description: '머리와 꼬리 2개의 뇌파가 동기화하여 에스퍼 파워가 ■■■의 10배로 강화되었다.'
  },
  {
    id: 1200,
    pokedexId: 'No.0982',
    name: '노고고치',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.0982.png',
    description: '단단한 꼬리로 땅속 깊은 곳에 있는 암반을 뚫어서 보금자리를 만든다. 굴의 깊이는 무려 10km에 이른다.'
  },
  {
    id: 1202,
    pokedexId: 'No.0983',
    name: '대도각참',
    type1: '악',
    type2: '강철',
    image: '/assets/pokemon/No.0983.png',
    description: '큰 군세의 정점에 올라선 단 한 마리의 ■■■만이 대도각참으로 진화할 수 있다.'
  },
  {
    id: 1215,
    pokedexId: 'No.0996',
    name: '드니차',
    type1: '드래곤',
    type2: '얼음',
    image: '/assets/pokemon/No.0996.png',
    description: '등지느러미로 열을 흡수해서 얼음 에너지로 변환한다. 고온일수록 에너지가 많이 모인다.'
  },
  {
    id: 1216,
    pokedexId: 'No.0997',
    name: '드니꽁',
    type1: '드래곤',
    type2: '얼음',
    image: '/assets/pokemon/No.0997.png',
    description: '주변의 공기를 얼려서 얼음 마스크로 얼굴을 보호하고 등지느러미를 얼음 검으로 바꾼다.'
  },
  {
    id: 1217,
    pokedexId: 'No.0998',
    name: '드닐레이브',
    type1: '드래곤',
    type2: '얼음',
    image: '/assets/pokemon/No.0998.png',
    description: '극저온의 냉기를 입에서 분사한다. 작열하는 마그마조차도 순식간에 얼려 버린다.'
  },
  {
    id: 1218,
    pokedexId: 'No.0999',
    name: '모으령',
    type1: '고스트',
    type2: null,
    image: '/assets/pokemon/No.0999.png',
    description: '약 1500년 전의 보물 상자 안에서 태어났다. 보물을 훔치려 드는 괘씸한 자의 생기를 흡수한다.'
  },
  {
    id: 1220,
    pokedexId: 'No.1000',
    name: '타부자고',
    type1: '강철',
    type2: '고스트',
    image: '/assets/pokemon/No.1000.png',
    description: '몸은 1000개의 코인으로 이뤄져 있다고 한다. 붙임성이 좋아서 누구와도 금방 친해진다.'
  },
  {
    id: 1231,
    pokedexId: 'No.1011',
    name: '과미르',
    type1: '풀',
    type2: '드래곤',
    image: '/assets/pokemon/No.1011.png',
    description: '어떤 지역에서만 재배되는 특별한 사과에 의해 진화했다. 두 마리가 하나인 포켓몬이다.'
  },
  {
    id: 1232,
    pokedexId: 'No.1012',
    name: '차데스',
    type1: '풀',
    type2: '고스트',
    image: '/assets/pokemon/No.1012.png',
    description: '다도의 길을 통달하지 못한 채 죽은 다도가의 원통함이 말차에 깃들어서 포켓몬이 되었다고 한다.'
  },
  {
    id: 1234,
    pokedexId: 'No.1013',
    name: '그우린차',
    type1: '풀',
    type2: '고스트',
    image: '/assets/pokemon/No.1013.png',
    description: '차로 위장하여 실수로 마셔 버린 상대의 생기를 흡수하려 하나 금방 들통나 버린다.'
  },
  {
    id: 1239,
    pokedexId: 'No.1017',
    name: '오거폰',
    type1: '풀',
    type2: null,
    image: '/assets/pokemon/No.1017.png',
    description: '쓰고 있는 가면에 따라 타입이 변한다. 날렵한 움직임과 발차기 기술로 상대를 농락한다.'
  },
  {
    id: 1243,
    pokedexId: 'No.1018',
    name: '브리두라스',
    type1: '강철',
    type2: '드래곤',
    image: '/assets/pokemon/No.1018.png',
    description: '주위로부터 정전기를 모은다. 네발로 엎드려서 발사하는 빔은 절대적인 위력을 자랑한다.'
  },
  {
    id: 1244,
    pokedexId: 'No.1019',
    name: '과미드라',
    type1: '풀',
    type2: '드래곤',
    image: '/assets/pokemon/No.1019.png',
    description: '7마리의 미드라가 꿀엿으로 만든 사과 안에서 지낸다. 가운데에 있는 미드라가 사령탑이다.'
  },
  {
    id: 1249,
    pokedexId: 'No.1024',
    name: '테라파고스',
    type1: '노말',
    type2: null,
    image: '/assets/pokemon/No.1024.png',
    description: '에너지를 단단한 결정으로 바꾸는 능력으로 몸을 지킨다. 테라스탈의 근원이 되는 포켓몬이다.'
  }
];

// 이 파일을 다른 JavaScript 파일에서 모듈로 사용하려면 export 구문을 사용할 수 있습니다.
// 예: export default pokemonDB;
module.exports = { pokemonDB };