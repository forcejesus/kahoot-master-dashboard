
interface PlanificationsEmptyProps {
  hasFilters: boolean;
}

export function PlanificationsEmpty({ hasFilters }: PlanificationsEmptyProps) {
  return (
    <div className="text-center py-8 text-gray-500">
      {hasFilters ? (
        <p>Aucune planification ne correspond à votre recherche.</p>
      ) : (
        <p>Aucune planification n'a encore été créée pour ce jeu.</p>
      )}
    </div>
  );
}
