interface TelegramWebApps {
    WebApp: {
      /** Инициализирует приложение и сообщает Telegram что оно готово к работе */
      ready(): void;
  
      /** Закрывает Mini App */
      close(): void;
  
      /** Расширяет Mini App на всю высоту */
      expand(): void;
  
      /** Возвращает true, если Mini App развернуто на всю высоту */
      isExpanded: boolean;

      /** Показывает, активно ли приложение (на переднем плане) */
      isActive: boolean;

      /** Возвращает true, если Mini App находится в полноэкранном режиме */
      isFullscreen: boolean;
  
      /** Возвращает true, если включены вертикальные свайпы для закрытия/минимизации */
      isVerticalSwipesEnabled: boolean;
  
      /** Включает вертикальные свайпы */
      enableVerticalSwipes(): void;
  
      /** Отключает вертикальные свайпы */
      disableVerticalSwipes(): void;
  
      /** Запрашивает полноэкранный режим */
      requestFullscreen: (options?: { scrollable?: boolean }) => void;
  
      /** Выходит из полноэкранного режима */
      exitFullscreen(): void;

      SettingsButton: {
        show: () => void;
        hide: () => void;
        onClick: (fn: () => void) => void;
        offClick: (fn: () => void) => void;
        isVisible: boolean;
      }

      viewportHeight: number;
      viewportStableHeight: number;

      showPopup: (params: {
        title?: string;
        message: string;
        buttons?: Array<{
          id?: string | number;
          type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
          text: string;
        }>;
      }, callback?: (buttonId: string | number) => void) => void;

          // Методы для работы с попапами
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
    
        // Методы для работы с темой
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        setBottomBarColor: (color: string) => void;
    
        // Методы для работы с ссылками и историями
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        shareToStory: (params: {
            media: string;
            text?: string;
            sticker?: string;
        }) => void;
  
      /** Безопасная область (отступы) */
      safeAreaInset: {
        top: number;
        right: number;
        bottom: number;
        left: number;
      };
  
      /** Версия Telegram клиента */
      version: string;
  
      /** Платформа (iOS, Android, etc) */
      platform: string;
  
      /** Цветовая схема (light или dark) */
      colorScheme: 'light' | 'dark';
  
      /** Параметры темы */
      themeParams: {
        bg_color: string;               // Цвет фона
        text_color: string;             // Цвет текста
        hint_color: string;             // Цвет подсказок
        link_color: string;             // Цвет ссылок
        button_color: string;           // Цвет кнопок
        button_text_color: string;      // Цвет текста кнопок
        secondary_bg_color: string;     // Вторичный цвет фона
        header_bg_color: string;        // Цвет фона заголовка
        accent_text_color: string;      // Цвет акцентного текста
        section_bg_color: string;       // Цвет фона секции
        section_header_text_color: string; // Цвет текста заголовка секции
        subtitle_text_color: string;    // Цвет текста подзаголовка
        destructive_text_color: string; // Цвет текста для опасных действий
        bottom_bar_bg_color: string;    // Цвет фона нижней панели
      };
  
      /** Главная кнопка внизу экрана */
      MainButton: {
        text: string;                   // Текст кнопки
        color: string;                  // Цвет фона
        textColor: string;             // Цвет текста
        isVisible: boolean;            // Видимость
        isActive: boolean;             // Активность
        isProgressVisible: boolean;    // Видимость прогресса
        show(): void;                  // Показать кнопку
        hide(): void;                  // Скрыть кнопку
        enable(): void;                // Включить кнопку
        disable(): void;               // Отключить кнопку
        showProgress(leaveActive: boolean): void;  // Показать прогресс
        hideProgress(): void;          // Скрыть прогресс
        onClick(callback: () => void): void;      // Установить обработчик клика
        offClick(callback: () => void): void;     // Удалить обработчик клика
      };
  
      /** Кнопка "Назад" в заголовке */
      BackButton: {
        isVisible: boolean;            // Видимость кнопки
        show(): void;                  // Показать кнопку
        hide(): void;                  // Скрыть кнопку
        onClick(callback: () => void): void;      // Установить обработчик клика
        offClick(callback: () => void): void;     // Удалить обработчик клика
      };
  
      /** Вторичная кнопка (Bot API 7.10+) */
      SecondaryButton: {
        text: string;                  // Текст кнопки
        color: string;                 // Цвет фона
        textColor: string;             // Цвет текста
        isVisible: boolean;            // Видимость
        isActive: boolean;             // Активность
        show(): void;                  // Показать кнопку
        hide(): void;                  // Скрыть кнопку
        onClick(callback: () => void): void;      // Установить обработчик клика
        offClick(callback: () => void): void;     // Удалить обработчик клика
      };
  
      /** Тактильная обратная связь */
      HapticFeedback: {
        impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
        notificationOccurred(type: 'error' | 'success' | 'warning'): void;
        selectionChanged(): void;
      };
  
      /** Данные инициализации (безопасные) */
      initData: string;
  
      /** Данные инициализации (небезопасные) */
      initDataUnsafe: {
        query_id?: string;             // ID запроса
        user?: {
          id: number;                  // ID пользователя
          first_name: string;          // Имя
          last_name?: string;          // Фамилия
          username?: string;           // Юзернейм
          language_code?: string;      // Код языка
          is_premium?: boolean;        // Премиум статус
          added_to_attachment_menu?: boolean;  // Добавлен в меню вложений
          allows_write_to_pm?: boolean;        // Разрешает писать в ЛС
        };
        receiver?: {
          id: number;                  // ID получателя
          is_bot: boolean;             // Является ли ботом
        };
        chat?: {
          id: number;                  // ID чата
          type: string;                // Тип чата
          title: string;               // Название
          username?: string;           // Юзернейм
          photo_url?: string;          // URL фото
        };
        start_param?: string;          // Стартовый параметр
        can_send_after?: number;       // Можно отправлять после
        auth_date: number;             // Дата авторизации
        hash: string;                  // Хеш
      };
  
      /** Облачное хранилище (Bot API 6.9+) */
      CloudStorage: {
        setItem(key: string, value: string, callback?: (error: Error | null) => void): void;
        getItem(key: string, callback?: (error: Error | null, value?: string) => void): void;
        removeItem(key: string, callback?: (error: Error | null) => void): void;
        getKeys(callback?: (error: Error | null, keys?: string[]) => void): void;
      };
    }
  }
  
  declare global {
    interface Window {
      Telegram?: TelegramWebApps;
    }
  }
  
  export type { TelegramWebApps };