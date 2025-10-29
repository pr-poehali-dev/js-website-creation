import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const contactMethods = [
    {
      icon: "Phone",
      title: "Телефон",
      value: "+7 (495) 123-45-67",
      description: "Пн-Пт с 9:00 до 18:00",
      action: "tel:+74951234567"
    },
    {
      icon: "Mail",
      title: "Email",
      value: "support@company.com",
      description: "Ответим в течение 24 часов",
      action: "mailto:support@company.com"
    },
    {
      icon: "MessageCircle",
      title: "Онлайн-чат",
      value: "Чат с оператором",
      description: "Доступен 24/7",
      action: null
    },
    {
      icon: "MapPin",
      title: "Офис",
      value: "г. Москва, ул. Примерная, д. 1",
      description: "Прием по предварительной записи",
      action: null
    },
  ];

  const workingHours = [
    { day: "Понедельник - Пятница", hours: "9:00 - 18:00" },
    { day: "Суббота", hours: "10:00 - 15:00" },
    { day: "Воскресенье", hours: "Выходной" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Contact" size={28} />
            <h1 className="text-2xl font-bold">Контакты</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Свяжитесь с нами</h2>
          <p className="text-muted-foreground">
            Мы всегда готовы помочь и ответить на ваши вопросы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <Card key={index} className="p-6 border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name={method.icon as any} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-foreground mb-1">{method.value}</p>
                  <p className="text-xs text-muted-foreground mb-3">{method.description}</p>
                  {method.action && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={method.action}>Связаться</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Clock" size={24} className="text-secondary" />
              <h3 className="text-xl font-semibold text-foreground">Режим работы</h3>
            </div>
            <div className="space-y-3">
              {workingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">{schedule.day}</span>
                  <span className="text-sm font-medium text-foreground">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Info" size={24} className="text-secondary" />
              <h3 className="text-xl font-semibold text-foreground">Дополнительная информация</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">ИНН:</strong> 7701234567
              </p>
              <p>
                <strong className="text-foreground">ОГРН:</strong> 1234567890123
              </p>
              <p>
                <strong className="text-foreground">Юридический адрес:</strong> 123456, г. Москва, ул. Примерная, д. 1, офис 100
              </p>
              <p className="pt-2">
                Для партнеров и корпоративных клиентов: <br />
                <a href="mailto:business@company.com" className="text-secondary hover:underline">
                  business@company.com
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
