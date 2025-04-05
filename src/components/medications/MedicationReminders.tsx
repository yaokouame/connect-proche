
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Calendar, Clock, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  medicationName: string;
  time: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  active: boolean;
}

const MedicationReminders = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "rem-1",
      medicationName: "Amoxicilline",
      time: "8:00",
      frequency: "daily",
      startDate: "2023-09-15",
      endDate: "2023-09-22",
      notes: "Prendre avec de la nourriture",
      active: true
    },
    {
      id: "rem-2",
      medicationName: "Doliprane",
      time: "14:00",
      frequency: "asNeeded",
      startDate: "2023-08-20",
      notes: "Prendre en cas de douleur",
      active: true
    }
  ]);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    medicationName: "",
    time: "",
    frequency: "daily",
    startDate: new Date().toISOString().split('T')[0],
    active: true
  });

  const handleAddReminder = () => {
    if (!newReminder.medicationName || !newReminder.time) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: `rem-${Date.now()}`,
      medicationName: newReminder.medicationName,
      time: newReminder.time,
      frequency: newReminder.frequency || "daily",
      startDate: newReminder.startDate || new Date().toISOString().split('T')[0],
      endDate: newReminder.endDate,
      notes: newReminder.notes,
      active: true
    };

    setReminders([...reminders, reminder]);
    
    toast({
      title: "Rappel ajouté",
      description: `Rappel pour ${reminder.medicationName} créé avec succès.`,
    });
    
    // Reset form
    setNewReminder({
      medicationName: "",
      time: "",
      frequency: "daily",
      startDate: new Date().toISOString().split('T')[0],
      active: true
    });
  };

  const toggleReminderActive = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, active: !reminder.active } 
        : reminder
    ));
    
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      toast({
        title: reminder.active ? "Rappel désactivé" : "Rappel activé",
        description: `Rappel pour ${reminder.medicationName} ${reminder.active ? "désactivé" : "activé"}.`,
      });
    }
  };

  const deleteReminder = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    if (reminder) {
      toast({
        title: "Rappel supprimé",
        description: `Rappel pour ${reminder.medicationName} supprimé.`,
      });
    }
  };

  // Group reminders by time of day
  const morningReminders = reminders.filter(r => {
    const hourNum = parseInt(r.time.split(':')[0]);
    return r.active && hourNum >= 5 && hourNum < 12;
  });

  const afternoonReminders = reminders.filter(r => {
    const hourNum = parseInt(r.time.split(':')[0]);
    return r.active && hourNum >= 12 && hourNum < 18;
  });

  const eveningReminders = reminders.filter(r => {
    const hourNum = parseInt(r.time.split(':')[0]);
    return r.active && hourNum >= 18 || hourNum < 5;
  });

  const inactiveReminders = reminders.filter(r => !r.active);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-health-blue" />
              Rappels de médicaments
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Nouveau rappel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un nouveau rappel</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="medication">Médicament</Label>
                    <Input
                      id="medication"
                      value={newReminder.medicationName}
                      onChange={(e) => setNewReminder({...newReminder, medicationName: e.target.value})}
                      placeholder="Nom du médicament"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="time">Heure</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newReminder.time}
                        onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Fréquence</Label>
                      <Select 
                        value={newReminder.frequency}
                        onValueChange={(value) => setNewReminder({...newReminder, frequency: value})}
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Tous les jours</SelectItem>
                          <SelectItem value="weekdays">Jours de semaine</SelectItem>
                          <SelectItem value="weekends">Week-ends</SelectItem>
                          <SelectItem value="asNeeded">Si nécessaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Date de début</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newReminder.startDate}
                        onChange={(e) => setNewReminder({...newReminder, startDate: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">Date de fin (optionnel)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newReminder.endDate}
                        onChange={(e) => setNewReminder({...newReminder, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (optionnel)</Label>
                    <Input
                      id="notes"
                      value={newReminder.notes}
                      onChange={(e) => setNewReminder({...newReminder, notes: e.target.value})}
                      placeholder="Instructions ou notes additionnelles"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddReminder}>Ajouter le rappel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="morning">Matin</TabsTrigger>
              <TabsTrigger value="afternoon">Après-midi</TabsTrigger>
              <TabsTrigger value="evening">Soir</TabsTrigger>
              <TabsTrigger value="inactive">Inactifs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {reminders.length > 0 ? (
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <ReminderCard 
                      key={reminder.id} 
                      reminder={reminder} 
                      onToggle={toggleReminderActive}
                      onDelete={deleteReminder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyReminders />
              )}
            </TabsContent>
            
            <TabsContent value="morning">
              {morningReminders.length > 0 ? (
                <div className="space-y-4">
                  {morningReminders.map((reminder) => (
                    <ReminderCard 
                      key={reminder.id} 
                      reminder={reminder} 
                      onToggle={toggleReminderActive}
                      onDelete={deleteReminder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyReminders message="Aucun rappel pour le matin" />
              )}
            </TabsContent>
            
            <TabsContent value="afternoon">
              {afternoonReminders.length > 0 ? (
                <div className="space-y-4">
                  {afternoonReminders.map((reminder) => (
                    <ReminderCard 
                      key={reminder.id} 
                      reminder={reminder} 
                      onToggle={toggleReminderActive}
                      onDelete={deleteReminder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyReminders message="Aucun rappel pour l'après-midi" />
              )}
            </TabsContent>
            
            <TabsContent value="evening">
              {eveningReminders.length > 0 ? (
                <div className="space-y-4">
                  {eveningReminders.map((reminder) => (
                    <ReminderCard 
                      key={reminder.id} 
                      reminder={reminder} 
                      onToggle={toggleReminderActive}
                      onDelete={deleteReminder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyReminders message="Aucun rappel pour le soir" />
              )}
            </TabsContent>
            
            <TabsContent value="inactive">
              {inactiveReminders.length > 0 ? (
                <div className="space-y-4">
                  {inactiveReminders.map((reminder) => (
                    <ReminderCard 
                      key={reminder.id} 
                      reminder={reminder} 
                      onToggle={toggleReminderActive}
                      onDelete={deleteReminder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyReminders message="Aucun rappel inactif" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReminderCard = ({ reminder, onToggle, onDelete }: ReminderCardProps) => {
  const frequencyText = {
    daily: "Tous les jours",
    weekdays: "Jours de semaine",
    weekends: "Week-ends",
    asNeeded: "Si nécessaire"
  }[reminder.frequency];

  return (
    <Card className={`border-l-4 ${reminder.active ? 'border-l-health-blue' : 'border-l-gray-300'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-medium ${!reminder.active && 'text-gray-500'}`}>
              {reminder.medicationName}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{reminder.time}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-3 w-3 mr-1" />
              <span>{frequencyText}</span>
            </div>
            {reminder.notes && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Note:</span> {reminder.notes}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={reminder.active ? "default" : "outline"} 
              size="sm"
              onClick={() => onToggle(reminder.id)}
            >
              {reminder.active ? "Actif" : "Inactif"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDelete(reminder.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyReminders = ({ message = "Aucun rappel configuré" }) => (
  <div className="text-center py-10 border rounded-md">
    <Bell className="mx-auto h-10 w-10 text-gray-400 mb-2" />
    <p className="text-gray-500 mb-2">{message}</p>
    <p className="text-sm text-gray-400">Créez des rappels pour ne jamais oublier vos médicaments</p>
  </div>
);

export default MedicationReminders;
