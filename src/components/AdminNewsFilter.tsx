
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from 'lucide-react';

interface FilterOptions {
  title: string;
  category: string;
  status: string;
  active: string;
}

interface AdminNewsFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const AdminNewsFilter: React.FC<AdminNewsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    title: '',
    category: '',
    status: '',
    active: ''
  });

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      title: '',
      category: '',
      status: '',
      active: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Filter Articles</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="h-8 text-xs"
        >
          <X className="h-3 w-3 mr-1" /> Clear
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="filterTitle">Title</Label>
          <div className="relative">
            <Input
              id="filterTitle"
              placeholder="Search by title..."
              value={filters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="filterCategory">Category</Label>
          <Input
            id="filterCategory"
            placeholder="Filter by category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="filterStatus">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger id="filterStatus">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="filterActive">Active</Label>
          <Select
            value={filters.active}
            onValueChange={(value) => handleFilterChange('active', value)}
          >
            <SelectTrigger id="filterActive">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsFilter;
