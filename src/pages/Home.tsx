import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: "MessageCircle",
      title: "Онлайн-чат 24/7",
      description: "Мгновенная связь с операторами круглосуточно"
    },
    {
      icon: "BookOpen",
      title: "База знаний",
      description: "Ответы на частые вопросы и инструкции"
    },
    {
      icon: "Ticket",
      title: "Система обращений",
      description: "Отслеживайте статус всех ваших запросов"
    },
    {
      icon: "Clock",
      title: "Быстрая обработка",
      description: "Средний ответ в течение 5 минут"
    },
  ];

  const stats = [
    { value: "< 5 мин", label: "Среднее время ответа" },
    { value: "24/7", label: "Онлайн поддержка" },
    { value: "98%", label: "Довольных клиентов" },
    { value: "10 000+", label: "Решенных обращений" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Headphones" size={28} />
            <h1 className="text-2xl font-bold">Служба поддержки</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/knowledge-base">База знаний</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/tickets">Обращения</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/contacts">Контакты</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-b from-primary/5 to-background py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Всегда на связи с вами
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Профессиональная поддержка клиентов в любое время суток. 
            Мы решаем ваши вопросы быстро и эффективно.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/support">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Начать чат
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/knowledge-base">
                <Icon name="BookOpen" size={20} className="mr-2" />
                База знаний
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Преимущества нашей поддержки
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className="p-3 bg-secondary/10 rounded-lg w-fit mb-4">
                  <Icon name={feature.icon as any} size={32} className="text-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Готовы начать?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Свяжитесь с нами любым удобным способом
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/support">Открыть чат</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/tickets">Создать обращение</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
