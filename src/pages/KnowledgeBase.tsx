import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "1",
      title: "Начало работы",
      icon: "BookOpen",
      articles: [
        { id: "1-1", question: "Как зарегистрироваться?", answer: "Для регистрации нажмите кнопку 'Войти' в правом верхнем углу и выберите 'Регистрация'. Заполните необходимые данные." },
        { id: "1-2", question: "Как восстановить пароль?", answer: "На странице входа нажмите 'Забыли пароль?'. Введите email, на который зарегистрирован аккаунт." },
        { id: "1-3", question: "Как изменить данные профиля?", answer: "Перейдите в 'Настройки' → 'Профиль'. Внесите необходимые изменения и сохраните." },
      ]
    },
    {
      id: "2",
      title: "Оплата и тарифы",
      icon: "CreditCard",
      articles: [
        { id: "2-1", question: "Какие способы оплаты доступны?", answer: "Мы принимаем банковские карты Visa, MasterCard, МИР, электронные кошельки и банковские переводы." },
        { id: "2-2", question: "Как отменить подписку?", answer: "В разделе 'Подписка' нажмите 'Управление подпиской' → 'Отменить подписку'. Доступ сохранится до конца оплаченного периода." },
        { id: "2-3", question: "Возможен ли возврат средств?", answer: "Возврат возможен в течение 14 дней с момента оплаты при условии минимального использования сервиса." },
      ]
    },
    {
      id: "3",
      title: "Техническая поддержка",
      icon: "Settings",
      articles: [
        { id: "3-1", question: "Сайт не загружается", answer: "Проверьте подключение к интернету. Очистите кэш браузера (Ctrl+Shift+Del). Попробуйте другой браузер." },
        { id: "3-2", question: "Ошибка при загрузке файлов", answer: "Проверьте размер файла (макс. 10 МБ) и формат. Убедитесь, что файл не поврежден." },
        { id: "3-3", question: "Как связаться с поддержкой?", answer: "Используйте онлайн-чат в правом нижнем углу, напишите на support@company.com или позвоните +7 (495) 123-45-67." },
      ]
    },
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="BookOpen" size={28} />
            <h1 className="text-2xl font-bold">База знаний</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по базе знаний..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="p-6 border-border">
              <div className="flex items-center gap-3 mb-4">
                <Icon name={category.icon as any} size={24} className="text-secondary" />
                <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {category.articles.map((article) => (
                  <AccordionItem key={article.id} value={article.id}>
                    <AccordionTrigger className="text-left hover:text-secondary">
                      {article.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {article.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
          {filteredCategories.length === 0 && (
            <Card className="p-12 border-border text-center">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
