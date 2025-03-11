
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlanificationsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  typeFilter: string;
  onTypeFilter: (value: string) => void;
  availableStatuses: string[];
  availableTypes: string[];
}

export const statusLabels: Record<string, string> = {
  "all": "Tous les statuts",
  "en attente": "En attente",
  "en cours": "En cours",
  "terminé": "Terminé"
};

export const typeLabels: Record<string, string> = {
  "all": "Tous les types",
  "public": "Public",
  "attribué": "Attribué",
  "attribuer": "Attribué"
};

export function PlanificationsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeFilter,
  availableStatuses,
  availableTypes
}: PlanificationsFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="Rechercher par PIN, statut ou type..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-sm font-medium flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Statut
          </Label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger id="status-filter" className="w-full">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusLabels[status] || status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type-filter" className="text-sm font-medium flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Type
          </Label>
          <Select value={typeFilter} onValueChange={onTypeFilter}>
            <SelectTrigger id="type-filter" className="w-full">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              {availableTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {typeLabels[type] || type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
