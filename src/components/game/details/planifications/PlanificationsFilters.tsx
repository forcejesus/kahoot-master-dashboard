
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/contexts/I18nContext";

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
  const { t } = useTranslation();

  const getStatusLabel = (status: string): string => {
    const statusLabels: Record<string, string> = {
      "all": t('planification.allStatuses') || "All statuses",
      "en attente": t('planification.pending'),
      "en cours": t('planification.inProgress') || "In progress",
      "terminé": t('planification.completed') || "Completed"
    };
    return statusLabels[status] || status;
  };

  const getTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
      "all": t('planification.allTypes') || "All types",
      "public": t('planification.public') || "Public",
      "attribué": t('planification.assigned') || "Assigned",
      "attribuer": t('planification.assigned') || "Assigned"
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Input
          type="text"
          placeholder={t('planification.searchPlaceholder') || "Search by PIN, status or type..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-sm font-medium flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> {t('planification.status')}
          </Label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger id="status-filter" className="w-full">
              <SelectValue placeholder={t('planification.filterByStatus') || "Filter by status"} />
            </SelectTrigger>
            <SelectContent>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {getStatusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type-filter" className="text-sm font-medium flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> {t('planification.type')}
          </Label>
          <Select value={typeFilter} onValueChange={onTypeFilter}>
            <SelectTrigger id="type-filter" className="w-full">
              <SelectValue placeholder={t('planification.filterByType') || "Filter by type"} />
            </SelectTrigger>
            <SelectContent>
              {availableTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {getTypeLabel(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
