
import { useState, useMemo } from "react";
import { Professional } from "@/types/user";

export function useProfessionals(professionals: Professional[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  const specialties = useMemo(() => 
    Array.from(new Set(professionals.map((pro) => pro.specialty))),
    [professionals]
  );
  
  const locations = useMemo(() => 
    Array.from(new Set(professionals.map((pro) => pro.location))),
    [professionals]
  );
  
  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  const handleLocationChange = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  
  const filteredProfessionals = useMemo(() => {
    return professionals.filter((pro) => {
      const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pro.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty = selectedSpecialties.length === 0 || 
                            selectedSpecialties.includes(pro.specialty);
      
      const matchesLocation = selectedLocations.length === 0 || 
                           selectedLocations.includes(pro.location);
      
      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [professionals, searchQuery, selectedSpecialties, selectedLocations]);

  return {
    searchQuery,
    setSearchQuery,
    selectedSpecialties,
    selectedLocations,
    specialties,
    locations,
    handleSpecialtyChange,
    handleLocationChange,
    filteredProfessionals
  };
}
