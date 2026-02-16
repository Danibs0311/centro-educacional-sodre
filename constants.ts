
import { NavItem, BlogPost, Professional } from './types';

export const COMPANY_INFO = {
  name: 'Educandário Sodré',
  phone: '(71) 99257-5862',
  whatsapp: '5571992575862',
  address: 'Estrada do Matadouro, Águas Claras, Salvador - BA',
  googleMapsLink: 'https://www.google.com/maps/search/?api=1&query=Educandário+Sodré+Estrada+do+Matadouro+Águas+Claras+Salvador',
  social: {
    instagram: 'https://www.instagram.com/educandario_sodre',
    facebook: 'https://facebook.com',
  }
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Bolsas & Parcerias', path: '/bolsas' },
  { label: 'Inclusão & NAE', path: '/nucleo-atendimento-especializado' },
  {
    label: 'Nossos Segmentos',
    path: '#',
    subItems: [
      { label: 'Educação Infantil', path: '/educacao-infantil' },
      { label: 'Ensino Fundamental I', path: '/ensino-fundamental-1' },
      { label: 'Ensino Fundamental II', path: '/ensino-fundamental-2' },
      { label: 'Ensino Médio', path: '/ensino-medio' },
    ]
  },
  { label: 'Blog', path: '/blog' },
  { label: 'Fale Conosco', path: '/contato' },
];

export const TEAM_MEMBERS: Professional[] = [
  {
    slug: 'psicopedagogia',
    nome: "Léia Neves Gomes",
    cargo: "Coordenadora & Psicopedagoga",
    especialidade: "Psicopedagogia Clínica e Institucional",
    bio: "Especialista em processos de aprendizagem e inclusão, Léia Neves Gomes lidera o NAE com foco no desenvolvimento cognitivo e emocional, garantindo que as barreiras pedagógicas sejam superadas através de intervenções personalizadas.",
    abordagens: [
      "Diagnóstico psicopedagógico clínico",
      "Intervenção em dificuldades de aprendizagem (Dislexia, TDAH, TEA)",
      "Adaptação curricular e de materiais didáticos",
      "Orientação e suporte direto às famílias",
      "Acompanhamento sistemático do progresso escolar"
    ],
    image: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/leia-sodre-prof.jpg"
  },
  {
    slug: 'neuropsicopedagogia',
    nome: "A Definir",
    cargo: "Neuropsicopedagoga",
    especialidade: "Neurociência aplicada à Educação",
    bio: "Nossa atuação em neuropsicopedagogia busca compreender como o cérebro aprende, integrando conhecimentos da neurologia e psicologia para otimizar o processo de ensino-aprendizagem.",
    abordagens: [
      "Avaliação das funções executivas",
      "Estimulação cognitiva",
      "Reabilitação neuropsicológica",
      "Estratégias baseadas em neuroplasticidade"
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400"
  },
  {
    slug: 'psicologia',
    nome: "Sabrina",
    cargo: "Psicóloga",
    especialidade: "Psicologia Escolar e do Desenvolvimento",
    bio: "O suporte psicológico no NAE visa o bem-estar emocional e a saúde mental dos nossos alunos, promovendo um ambiente seguro para o crescimento pessoal e social.",
    abordagens: [
      "Acolhimento emocional individual e grupal",
      "Mediação de conflitos",
      "Promoção de competências socioemocionais",
      "Prevenção ao bullying e ansiedade escolar"
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=400"
  },
  {
    slug: 'fonoaudiologia',
    nome: "A Definir",
    cargo: "Fonoaudióloga Escolar",
    especialidade: "Linguagem e Aprendizagem",
    bio: "A fonoaudiologia escolar atua na prevenção e auxílio de questões relacionadas à comunicação oral e escrita, essenciais para o sucesso acadêmico.",
    abordagens: [
      "Estimulação de consciência fonológica",
      "Acompanhamento de trocas na fala e escrita",
      "Aprimoramento da linguagem expressiva e compreensiva",
      "Assessoria aos professores sobre processamento auditivo"
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400"
  }
];

export const CONTENT = {
  home: {
    title: "Formando cidadãos com autonomia e valores",
    text: "O Educandário Sodré, localizado em Águas Claras, tem como missão formar cidadãos autônomos, responsáveis e comprometidos com valores éticos e sociais. Atuamos na Educação Infantil, no Ensino Fundamental e no Ensino Médio, oferecendo uma proposta pedagógica consistente, alinhada às diretrizes educacionais e às necessidades contemporâneas da formação integral do estudante.\n\nNossa prática educativa busca equilibrar o desenvolvimento acadêmico, social, emocional e físico dos alunos, respeitando as diferentes etapas de aprendizagem e promovendo o protagonismo, a responsabilidade e o pensamento crítico.\n\nA infraestrutura da instituição foi planejada para garantir segurança, conforto e funcionalidade no cotidiano escolar. Dispomos de pátio coberto, quadra poliesportiva, creche, cantina com foco nutricional e um Núcleo de Atendimento Especializado (NAE) completo, destinado ao suporte pedagógico, psicopedagógico e socioemocional dos estudantes que necessitam de acompanhamento específico.\n\nO Educandário Sodré mantém uma relação próxima com as famílias, baseada na transparência, no diálogo e na corresponsabilidade pelo processo educativo. Nosso compromisso é oferecer um ambiente acolhedor, organizado e academicamente sólido, que contribua para a formação de indivíduos preparados para os desafios da vida acadêmica, profissional e social."
  },
  scholarships: {
    title: "Bolsas de Estudo & Parcerias",
    text: "Acreditamos que a educação de excelência deve ser acessível. O Educandário Sodré mantém parcerias estratégicas para garantir que famílias de Águas Claras e região possam oferecer o melhor futuro para seus filhos.",
    educaMais: {
      title: "Educa Mais Brasil",
      description: "Somos parceiros oficiais do maior programa de bolsas de estudo do país. Através do Educa Mais Brasil, você pode garantir descontos de até 50% em todas as mensalidades, do Infantil ao Médio.",
      howTo: "Basta acessar o site do Educa Mais Brasil, selecionar o Educandário Sodré e escolher a série desejada para gerar seu cupom de pré-matrícula."
    },
    queroBolsa: {
      title: "Quero Bolsa",
      description: "Também estamos presentes no Quero Bolsa, facilitando sua entrada na escola com processos simplificados e descontos garantidos até o final do ciclo escolar."
    }
  },
  nae: {
    title: "Um olhar especial para cada aluno",
    text: "O Educandário Sodré acredita que a educação deve ser para todos. Por isso, nosso Núcleo de Atendimento Especializado (NAE) oferece suporte psicopedagógico e emocional, garantindo que alunos com neurodivergências ou dificuldades de aprendizagem tenham o acolhimento necessário.\n\nAqui, a inclusão acontece na prática, com profissionais capacitados e parceria constante com as famílias.",
    professional: {
      name: "Léia Neves Gomes",
      role: "Psicopedagoga Especialista",
      bio: "Com vasta experiência no acompanhamento de processos de aprendizagem e inclusão escolar, Léia Neves Gomes coordena as intervenções psicopedagógicas do Educandário Sodré, focando no desenvolvimento da autonomia e superação de barreiras pedagógicas."
    }
  },
  infantil: {
    title: "Educação Infantil no Educandário Sodré: Onde o Aprender Começa com Afeto e Descobertas",
    text: "As primeiras experiências escolares são fundamentais para a formação da identidade e do prazer em aprender. No Educandário Sodré, a Educação Infantil é planejada para oferecer um ambiente seguro, acolhedor e repleto de estímulos, onde a criança se sente encorajada a explorar o mundo ao seu redor com confiança e alegria.\n\nNossa proposta pedagógica para esta etapa valoriza o brincar como a principal linguagem da infância. Através de atividades lúdicas e interativas, promovemos o desenvolvimento das habilidades motoras, cognitivas, emocionais e sociais, respeitando o ritmo biológico e as necessidades individuais de cada pequeno estudante.\n\nOs espaços da nossa unidade são cuidadosamente organizados para despertar a curiosidade. Contamos com pátio amplo, parquinho e áreas de convivência que favorecem a interação entre os pares e o contato com diferentes texturas, sons e cores. Aqui, cada momento — da rodinha de conversa à contação de histórias — é uma oportunidade para ampliar o repertório cultural e a autonomia.\n\nSabemos que a parceria com a família é essencial. Por isso, mantemos um canal de comunicação aberto e transparente, garantindo que os pais tenham a tranquilidade de saber que seus filhos estão sob os cuidados de uma equipe apaixonada pela educação e comprometida com o bem-estar integral de cada criança.\n\nNo Educandário Sodré, a Educação Infantil prepara a base para o futuro, cultivando valores, criatividade e o desejo constante de descobrir.\n\n👉 Agende uma visita ao Educandário Sodré e conheça nosso espaço dedicado aos pequenos. Venha ver de perto como transformamos o cuidado em aprendizado significativo."
  },
  fund1: {
    title: "Ensino Fundamental I (1º ao 5º ano) no Educandário Sodré",
    text: "Escolher a escola certa para o Ensino Fundamental I (1º ao 5º ano) é uma decisão importante na vida da criança. No Educandário Sodré, acreditamos que cada aluno possui potencial para aprender, desenvolver-se e construir uma base sólida para o futuro.\n\nNossa proposta pedagógica respeita as fases do desenvolvimento infantil e as diferentes formas de aprendizagem, valorizando a individualidade de cada criança. O brincar faz parte do processo educativo, pois entendemos que ele é essencial para o desenvolvimento emocional, social e cognitivo, tornando o aprendizado mais significativo e prazeroso.\n\nOs espaços, tempos e materiais pedagógicos são organizados para estimular a participação ativa dos alunos. As crianças são incentivadas a se expressar, ouvir, dialogar e construir conhecimentos por meio de diversas linguagens, como a oral, escrita, musical e corporal.\n\nO Educandário Sodré utiliza recursos didáticos variados, como jogos educativos, contação de histórias e atividades lúdicas, que favorecem a compreensão do mundo, o pensamento crítico e o gosto pelo aprender.\n\nNo Educandário Sodré, o Ensino Fundamental I oferece uma formação cuidadosa, segura e consistente, proporcionando às famílias a tranquilidade de confiar a educação de seus filhos a uma instituição comprometida com o desenvolvimento integral da criança.\n\n👉 Agende uma visita ao Educandário Sodré e conheça de perto nossa proposta pedagógica. Entre em contato e garanta uma educação sólida para o seu filho desde os primeiros anos escolares."
  },
  fund2: {
    title: "Ensino Fundamental II (6º ao 9º ano) no Educandário Sodré",
    text: "O ingresso no Ensino Fundamental II (6º ao 9º ano) marca uma fase de grandes transformações na vida dos estudantes, envolvendo mudanças físicas, emocionais e sociais. No Educandário Sodré, esse período de transição é acompanhado de perto, com acolhimento, orientação e ações pedagógicas que ajudam o aluno a se adaptar com segurança e equilíbrio.\n\nNesse segmento, os estudantes consolidam as aprendizagens dos anos iniciais e ampliam seus conhecimentos, desenvolvendo habilidades, competências e autonomia exigidas pelos diferentes componentes curriculares. Os desafios são progressivos e pensados para estimular o raciocínio, a responsabilidade e a ampliação do repertório acadêmico e cultural.\n\nOs educadores do Educandário Sodré utilizam práticas pedagógicas diversificadas, como incentivo à leitura, uso de tecnologias educacionais, valorização das artes e dos esportes. Essas estratégias favorecem o desenvolvimento da criticidade, organização, protagonismo e empatia, preparando os alunos para lidar com diferentes fontes de informação e convivência social.\n\nO currículo segue rigorosamente as diretrizes da BNCC e é organizado nas áreas de Linguagens, Matemática, Ciências da Natureza e Ciências Humanas, garantindo uma formação integrada, sem perder a profundidade de cada disciplina. Essa estrutura fortalece a base acadêmica necessária para a continuidade dos estudos no Ensino Médio.\n\nNo Educandário Sodré, o Ensino Fundamental II prepara o aluno não apenas para avançar academicamente, mas para crescer como indivíduo, com responsabilidade, respeito e visão de futuro.\n\n👉 Agende uma visita ao Educandário Sodré e conheça nossa proposta para o Ensino Fundamental II. Entre em contato e acompanhe de perto a formação do seu filho nessa etapa decisiva da vida escolar."
  },
  medio: {
    title: "Ensino Médio (1ª a 3ª série) no Educandário Sodré",
    text: "Quando chegam ao Ensino Médio no Educandário Sodré, os alunos têm a oportunidade de consolidar, aprofundar e ampliar los conhecimentos adquiridos durante o Ensino Fundamental. As atividades pedagógicas enfatizam, de forma integrada, o conhecimento prático, amplo, contextualizado e interdisciplinar, atendendo às necessidades do aluno e da vida contemporânea.\n\nEducar é também orientar escolhas. Um aspecto central desta etapa é a tomada de decisão profissional. Nosso processo de mediação foca no autoconhecimento, informações sobre o mercado de trabalho atual e futuro, e empreendedorismo, preparando o jovem para os desafios da vida adulta.\n\nCom ênfase especial na 3ª série, o Educandário Sodré foca nos principais vestibulares do país. Nosso corpo docente atualizado garante apoio integral para lidar com a ansiedade e os dilemas deste último ano, transformando este período em uma etapa de revisão profunda e consolidação de aprendizados.\n\nO protagonismo na construção do saber é encorajado, promovendo a autonomia e o pensamento crítico humanizado. Tecnologia, inovação e o estabelecimento de vínculos afetivos sólidos garantem que nossos pré-vestibulandos estejam prontos para as suas conquistas.\n\nA 3ª série vivencia a experiência única de nossa tradição, onde o acolhimento e o respeito ao próximo são diferenciais no contexto de Salvador. Abrimos as asas para o futuro de nossos estudantes, reforçando os valores da vida profissional futura e a excelência acadêmica.\n\n👉 Agende uma visita ao Educandário Sodré e prepare o seu futuro com quem entende de educação e formação humana. Entre em contato e conheça nossa estrutura para o Ensino Médio."
  },
  blog: {
    title: "Acontece no Sodré",
    text: "Acompanhe nossos eventos, dicas pedagógicas e novidades sobre o ano letivo em Águas Claras."
  },
  contato: {
    title: "Visite o Educandário Sodré",
    text: "Estamos de portas abertas para receber sua família na Estrada do Matadouro. Venha conhecer nossa estrutura completa."
  }
};

// Mock Blog Data
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    titulo: 'Matrículas Abertas: Garanta sua Bolsa',
    slug: 'matriculas-abertas-bolsas',
    resumo: 'Saiba como utilizar o Educa Mais Brasil e Quero Bolsa para estudar no Sodré.',
    conteudo: 'A educação de qualidade está ao seu alcance...',
    autor: 'Secretaria',
    created_at: '2023-11-25',
    publicado: true,
    image: 'https://picsum.photos/800/400?random=11'
  },
  {
    id: '2',
    titulo: 'Nossa Feira de Ciências foi um sucesso!',
    slug: 'feira-ciencias',
    resumo: 'Alunos do Fundamental e Médio apresentaram projetos inovadores no pátio da escola.',
    conteudo: 'Criatividade e ciência caminharam juntas...',
    autor: 'Coordenação',
    created_at: '2023-11-15',
    publicado: true,
    image: 'https://picsum.photos/800/400?random=12'
  },
  {
    id: '3',
    titulo: 'A importância da Leitura na Infância',
    slug: 'leitura-infancia',
    resumo: 'Como nossa biblioteca atua no incentivo aos pequenos leitores.',
    conteudo: 'Ler abre portas para mundos mágicos...',
    autor: 'Bibliotecária',
    created_at: '2023-11-10',
    publicado: true,
    image: 'https://picsum.photos/800/400?random=13'
  },
  {
    id: '4',
    titulo: 'Novas Atividades Extracurriculares',
    slug: 'novas-atividades',
    resumo: 'Judô, Ballet e Robótica agora fazem parte do nosso quadro de atividades.',
    conteudo: 'Estimular o desenvolvimento vai além da sala de aula...',
    autor: 'Coordenação',
    created_at: '2023-11-01',
    publicado: true,
    image: 'https://picsum.photos/800/400?random=14'
  }
];
