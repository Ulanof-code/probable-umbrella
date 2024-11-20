import { useEffect, useState } from 'react';
import { TelegramWebApps } from '../types/telegram';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [queryId, setQueryId] = useState<string | null>(null);
  
  const [tg, setTg] = useState<TelegramWebApps | null>(null);

  useEffect(() => {
    setTg(window.Telegram?.WebApp as unknown as TelegramWebApps ?? null);
    // setUser(window.Telegram?.WebApp?.initDataUnsafe?.user ?? null);
  }, []);

  useEffect(() => {
    if (tg) {
      setUser(tg?.WebApp?.initDataUnsafe?.user ?? null);
    }
  }, [tg]);

  // Основные методы
  const close = () => tg?.WebApp?.close();
  const expand = () => tg?.WebApp?.expand();
  const isExpanded = tg?.WebApp?.isExpanded;

  // Полноэкранный режим (Bot API 8.0)
  const requestFullscreen = (options?: { scrollable?: boolean }) => tg?.WebApp?.requestFullscreen(options);
  const exitFullscreen = () => tg?.WebApp?.exitFullscreen();
  const isFullscreen = tg?.WebApp?.isFullscreen;

  // Безопасные области и размеры
  const safeAreaInset = tg?.WebApp?.safeAreaInset;
  const viewportHeight = tg?.WebApp?.viewportHeight;
  const viewportStableHeight = tg?.WebApp?.viewportStableHeight;

  // Управление кнопками
  const mainButton = {
    show: () => tg?.WebApp?.MainButton?.show(),
    hide: () => tg?.WebApp?.MainButton?.hide(),
    setText: (text: string) => {
      if (tg?.WebApp?.MainButton) tg.WebApp.MainButton.text = text;
    },
    onClick: (fn: () => void) => tg?.WebApp?.MainButton?.onClick(fn),
    offClick: (fn: () => void) => tg?.WebApp?.MainButton?.offClick(fn),
    enable: () => tg?.WebApp?.MainButton?.enable(),
    disable: () => tg?.WebApp?.MainButton?.disable(),
  };

  const secondaryButton = {
    show: () => tg?.WebApp?.SecondaryButton?.show(),
    hide: () => tg?.WebApp?.SecondaryButton?.hide(),
    setText: (text: string) => {
      if (tg?.WebApp?.SecondaryButton) tg.WebApp.SecondaryButton.text = text;
    },
    onClick: (fn: () => void) => tg?.WebApp?.SecondaryButton?.onClick(fn),
    offClick: (fn: () => void) => tg?.WebApp?.SecondaryButton?.offClick(fn),
  };

  const backButton = {
    show: () => tg?.WebApp?.BackButton?.show(),
    hide: () => tg?.WebApp?.BackButton?.hide(),
    onClick: (fn: () => void) => tg?.WebApp?.BackButton?.onClick(fn),
    offClick: (fn: () => void) => tg?.WebApp?.BackButton?.offClick(fn),
  };

  const settingsButton = {
    show: () => tg?.WebApp?.SettingsButton?.show(),
    hide: () => tg?.WebApp?.SettingsButton?.hide(),
    onClick: (fn: () => void) => tg?.WebApp?.SettingsButton?.onClick(fn),
    offClick: (fn: () => void) => tg?.WebApp?.SettingsButton?.offClick(fn),
  };

  // Методы для работы с UI
  const showPopup = (params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id: string | number;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }) => tg?.WebApp?.showPopup(params);

  const showAlert = (message: string) => tg?.WebApp?.showAlert(message);
  const showConfirm = (message: string) => new Promise<boolean>((resolve) => tg?.WebApp?.showConfirm(message, resolve));

  // Методы для работы с темой
  const setHeaderColor = (color: string) => tg?.WebApp?.setHeaderColor(color);
  const setBackgroundColor = (color: string) => tg?.WebApp?.setBackgroundColor(color);
  const setBottomBarColor = (color: string) => tg?.WebApp?.setBottomBarColor(color);

  // Методы для работы с ссылками
  const openLink = (url: string, options?: { try_instant_view?: boolean }) => tg?.WebApp?.openLink(url, options);
  const openTelegramLink = (url: string) => tg?.WebApp?.openTelegramLink(url);
  const shareToStory = (params: { media: string; text?: string; sticker?: string; }) => tg?.WebApp?.shareToStory(params);

  // CloudStorage API
  const cloudStorage = {
    setItem: (key: string, value: string) => 
      new Promise<void>((resolve, reject) => 
        tg?.WebApp?.CloudStorage?.setItem(key, value, (error: Error | null) => error ? reject(error) : resolve())
      ),
    getItem: (key: string) => 
      new Promise<string>((resolve, reject) => 
        tg?.WebApp?.CloudStorage?.getItem(key, (error: Error | null, value?: string) => error ? reject(error) : resolve(value ?? ''))
      ),
    removeItem: (key: string) => 
      new Promise<void>((resolve, reject) => 
        tg?.WebApp?.CloudStorage?.removeItem(key, (error: Error | null) => error ? reject(error) : resolve())
      ),
    getKeys: () => 
      new Promise<string[]>((resolve, reject) => 
        tg?.WebApp?.CloudStorage?.getKeys((error: Error | null, keys?: string[]) => error ? reject(error) : resolve(keys ?? []))
      ),
  };

  const isActive = tg?.WebApp?.isActive;

  return {
    tg,
    user,
    queryId,
    close,
    expand,
    isExpanded,
    requestFullscreen,
    exitFullscreen,
    isFullscreen,
    safeAreaInset,
    viewportHeight,
    viewportStableHeight,
    mainButton,
    secondaryButton,
    backButton,
    settingsButton,
    showPopup,
    showAlert,
    showConfirm,
    setHeaderColor,
    setBackgroundColor,
    setBottomBarColor,
    openLink,
    openTelegramLink,
    shareToStory,
    cloudStorage,
    isLoaded: !!tg,
    platform: tg?.WebApp?.platform,
    colorScheme: tg?.WebApp?.colorScheme,
    themeParams: tg?.WebApp?.themeParams,
    isActive,
  };
}