// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './HomePage.css';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import PhotoSlider from '../components/PhotoSlider/PhotoSlider';

const HomePage = () => {
  const [showVideo, setShowVideo] = useState(true); // сразу показываем видео

  const beforePhotos = [
  '/images/case1.png',
  '/images/case2.png',
  '/images/case1.png',
  '/images/case2.png',
  '/images/case1.png',
  '/images/case2.png',
  '/images/case1.png',
    '/images/case2.png',
  '/images/case1.png',
  '/images/case2.png',
 
];

const afterPhotos = [
  '/images/case1.png',
  '/images/case2.png',
  '/images/case1.png',
  '/images/case2.png',
  '/images/case1.png',
  '/images/case2.png',
  '/images/case1.png',
    '/images/case2.png',
  '/images/case1.png',
  '/images/case2.png',
];
  return (
    <div className="homepage">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Освой трейдинг на практике</h1>
          <p>Пошаговая методика и реальные сделки от действующего трейдера</p>
          <Link to="/register" className="btn primary">Начать обучение</Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="section light">
        <h2 className="section-title">Что ты получишь</h2>
        <div className="cards">
          <div className="card">
            <h3>Готовая стратегия</h3>
            <p>Рабочая система входа и выхода с чеклистами.</p>
          </div>
          <div className="card">
            <h3>Практика на реальных примерах</h3>
            <p>Разбор живых сделок и паттернов.</p>
          </div>
          <div className="card">
            <h3>Поддержка и чат</h3>
            <p>Доступ к закрытому сообществу единомышленников.</p>
          </div>
        </div>
      </section>

      {/* Course Program */}
<section className="section">
  <h2 className="section-title">Программа курса</h2>
  <div className="modules-grid">
    {[
      { title: 'Модуль 1: Введение', desc: 'Что такое трейдинг, виды рынков и основы.' },
      { title: 'Модуль 2: Психология', desc: 'Контроль эмоций, дисциплина и мышление трейдера.' },
      { title: 'Модуль 3: Структура рынка', desc: 'Тренды, уровни, фазы рынка, накопления и распределения.' },
      { title: 'Модуль 4: Ликвидность', desc: 'Как маркетмейкеры двигают цену и где искать входы.' },
      { title: 'Модуль 5: Паттерны входа', desc: 'Форматы входа: ретест, ложный пробой, импульс.' },
      { title: 'Модуль 6: Сделка под контролем', desc: 'Где ставить стоп, тейк, как сопровождать трейд.' },
      { title: 'Модуль 7: Риск-менеджмент', desc: 'Формулы расчета, риск на день, риск на сделку.' },
      { title: 'Модуль 8: Система торговли', desc: 'Готовая стратегия с правилами и чеклистами.' },
      { title: 'Модуль 9: Практика', desc: 'Разбор сделок, симуляции и домашние задания.' },
      { title: 'Модуль 10: Инструменты', desc: 'TradingView, Binance, Bybit, CoinMarketCap и другие.' },
      { title: 'Модуль 11: Журнал трейдера', desc: 'Шаблон, трекер прогресса, разбор ошибок.' },
      { title: 'Модуль 12: Финальный тест', desc: 'Экзамен: план, 3 сделки, анализ и обратная связь.' },
    ].map((mod, i) => (
      <div className="module-card" key={i}>
        <h4>{mod.title}</h4>
        <p>{mod.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* Tariffs */}
      <section className="section light">
        <h2 className="section-title">Тарифы</h2>
        <div className="tariffs">
          <div className="tariff">
            <h3>Базовый</h3>
            <p>Доступ к урокам</p>
            <strong>499$</strong>
            <Link to="/register" className="btn">Выбрать</Link>
          </div>
          <div className="tariff highlight">
            <h3>Стандарт</h3>
            <p>Уроки + поддержка + чат</p>
            <strong>799$</strong>
            <Link to="/register" className="btn">Выбрать</Link>
          </div>
          <div className="tariff">
            <h3>Продвинутый</h3>
            <p>Всё выше + лайвы + личный разбор</p>
            <strong>999$</strong>
            <Link to="/register" className="btn">Выбрать</Link>
          </div>
          <div className="tariff">
            <h3>Менторство</h3>
            <p>Всё выше + лайвы + личный разбор</p>
            <strong>1499$</strong>
            <Link to="/register" className="btn">Выбрать</Link>
          </div>
        </div>
      </section>
<div>

      {showVideo && (
        <VideoPlayer
          src="/videos/preview.mkv"  // путь к видео в public/videos
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>



      {/* About me*/}
      <section className="section">
        <h2 className="section-title">Обо мне</h2>
        <div className="about">
          <p>
            Меня зовут Артём. Мне 21 год. Я трейдер с опытом, прошёл путь от слива до стабильной торговли. Этот курс — сжатая выжимка всего моего пути, практики и стратегии, которые реально работают.
          </p>
        </div>
      </section>
      {/* My Journey Before Crypto */}
  <PhotoSlider
    title="Кем я был до крипты"
    subtitle="Фото из прошлого — путь с самого нуля"
    photos={beforePhotos}
    photoWidth={383}
    photoHeight={270}
    zoomOnHover={true}
  />
  {/* How Crypto Changed My Life */}
  <PhotoSlider
    title="Как крипта изменила мою жизнь"
    subtitle="Теперь я сам создаю свою реальность"
    photos={afterPhotos}
    photoWidth={320}
    photoHeight={200}
    zoomOnHover={true}
  />
      {/* Motivation */}
      <section className="section motivation">
        <h2>Ты можешь начать прямо сейчас</h2>
        <p>Достаточно сделать первый шаг. Остальное — моя забота.</p>
        <Link to="/register" className="btn primary large">Хочу учиться</Link>
      </section>
            {/* For Whom */}
      <section className="section light">
        <h2 className="section-title">Кому подойдёт курс</h2>
        <div className="cards">
          <div className="card">
            <h3>Новичкам</h3>
            <p>С нуля разберёшься в трейдинге и избежишь слива.</p>
          </div>
          <div className="card">
            <h3>Тем, кто уже пробовал</h3>
            <p>Систематизируешь хаотичные знания и начнёшь видеть сетапы.</p>
          </div>
          <div className="card">
            <h3>Сильным практикам</h3>
            <p>Усилишь текущую торговлю за счёт новых фишек и психологии.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <h2 className="section-title">Отзывы участников</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"Прошёл курс за 2 недели. Результаты: +25% депозит. Всё чётко, без воды."</p>
            <span>- Дмитрий, Украина</span>
          </div>
          <div className="testimonial">
            <p>"Наконец-то понял, как работает ложный пробой. Теперь вижу сетапы сам."</p>
            <span>- Владислав, Германия</span>
          </div>
          <div className="testimonial">
            <p>"Лучшее вложение в обучение. Автор реально на практике показывает, как работает рынок."</p>
            <span>- Костя, Чехия</span>
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="section light">
        <h2 className="section-title">Есть вопросы?</h2>
        <p>Напиши напрямую в Telegram, я лично отвечу и помогу с выбором тарифа.</p>
        <a
          href="https://t.me/your_username"
          target="_blank"
          rel="noreferrer"
          className="btn large"
        >
          Написать в Telegram
        </a>
      </section>
            {/* Bonuses Section */}
      <section className="section">
        <h2 className="section-title">Бонусы к курсу</h2>
        <div className="cards">
          <div className="card">
            <h3>Дневник трейдера</h3>
            <p>Готовый шаблон для фиксации сделок и анализа.</p>
          </div>
          <div className="card">
            <h3>Mindset-фреймворк</h3>
            <p>PDF-инструкция по контролю эмоций и дисциплине.</p>
          </div>
          <div className="card">
            <h3>Личный созвон</h3>
            <p>1:1 консультация при покупке тарифа Менторство.</p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <PhotoSlider
    title="Мои сделки"
    subtitle="Реальные трейды, опубликованные в Telegram"
    photos={beforePhotos}
  />
      {/* FAQ Section */}
<section className="section">
  <h2 className="section-title">Частые вопросы</h2>
  <div className="faq-list">
    {[
      {
        question: 'Курс подойдёт, если я совсем с нуля?',
        answer: 'Да, я объясняю фундаментальные принципы с нуля — от психологии до точек входа.',
      },
      {
        question: 'Будет ли обратная связь?',
        answer: 'Да, на тарифах Standard и Premium — поддержка в Telegram + ответы на вопросы.',
      },
      {
        question: 'Сколько времени нужно на курс?',
        answer: 'В среднем 2-3 недели, если проходить по 1 модулю в день. Можно быстрее.',
      },
      {
        question: 'Есть ли гарантия результата?',
        answer: 'Ты получаешь систему. Результат зависит от твоей дисциплины и практики.',
      },
      {
        question: 'Подходит ли курс для крипты?',
        answer: 'Да, все примеры и стратегии показываю на криптовалютном рынке.',
      },
    ].map((item, index) => (
      <details key={index} className="faq-item">
        <summary>
          <span>{item.question}</span>
          <svg
            className="faq-arrow"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div className="faq-answer">{item.answer}</div>
      </details>
    ))}
  </div>
</section>
{/* Program Section */}
<section className="section">
  <h2 className="section-title">Программа курса</h2>
  <div className="faq-list">
    {[
      {
        title: 'Модуль 1: Введение в трейдинг',
        content: 'Что такое трейдинг, как устроены рынки, кто такие маркетмейкеры, ликвидность, спреды и основные инструменты.',
      },
      {
        title: 'Модуль 2: Психология трейдинга',
        content: 'Как эмоции мешают заработать, какие бывают стадии трейдера, как работать со страхом и жадностью.',
      },
      {
        title: 'Модуль 3: График. Структура рынка',
        content: 'Как читать график, что такое тренд, уровни, свинг-структура и рыночные циклы.',
      },
      {
        title: 'Модуль 4: Ликвидность и манипуляции',
        content: 'Как работает ликвидность, типы манипуляций и как использовать ложные пробои в свою пользу.',
      },
      {
        title: 'Модуль 5: Паттерны входа',
        content: 'Конкретные точки входа с примерами. Ретесты, ложные пробои, накопления.',
      },
      {
        title: 'Модуль 6: Менеджмент сделки',
        content: 'Где ставить стоп, как брать тейк, как фиксировать прибыль частично.',
      },
      {
        title: 'Модуль 7: Риск-менеджмент',
        content: 'Оптимальный риск на сделку, дневной лимит, формулы и таблицы.',
      },
      {
        title: 'Модуль 8: Стратегия торговли',
        content: 'Готовая система с чеклистами и алгоритмом.',
      },
      {
        title: 'Модуль 9: Примеры сделок',
        content: 'Реальные трейды по системе, разбор ошибок и удачных решений.',
      },
      {
        title: 'Модуль 10: Платформы и инструменты',
        content: 'TradingView, биржи, боты, индикаторы. Что использовать и как.',
      },
      {
        title: 'Модуль 11: Журнал трейдера',
        content: 'Как вести учёт сделок, что анализировать и как развиваться.',
      },
      {
        title: 'Модуль 12: Финальный проект',
        content: 'Итоговое задание — торговый план и 3 сделки по стратегии.',
      },
    ].map((mod, i) => (
      <details key={i} className="faq-item">
        <summary>
          <span>{mod.title}</span>
          <svg
            className="faq-arrow"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div className="faq-answer">{mod.content}</div>
      </details>
    ))}
  </div>
</section>


      {/* Footer */}
<footer className="footer">
  <div className="footer-links">
    <a href="/offer" target="_blank" rel="noreferrer">Договор-Оферта</a>
    <a href="/privacy" target="_blank" rel="noreferrer">Политика конфиденциальности</a>
    <a href="/support" target="_blank" rel="noreferrer">Тех. поддержка</a>
  </div>
  <p>© {new Date().getFullYear()} Digital Vector. Все права защищены.</p>
</footer>

    </div>
  );
};

export default HomePage;
