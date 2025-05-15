
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { createNewsArticle, updateNewsArticle, NewsArticle } from "@/services/newsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewsFormProps {
  article: NewsArticle | null;
  onSuccess: () => void;
  isCreate?: boolean;
}

const NewsForm = ({ article, onSuccess, isCreate = false }: NewsFormProps) => {
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '',
    title_en: '',
    status: 'draft',
    image: '',
    summary_txt: '',
    html: '',
    sources: [],
    category: '',
    summary: '',
    published_date: new Date().toISOString(),
    rate: 0,
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sourcesInput, setSourcesInput] = useState('');

  useEffect(() => {
    if (article && !isCreate) {
      // Format sources array back to comma-separated string for editing
      const sourcesString = article.sources ? article.sources.join(', ') : '';
      setSourcesInput(sourcesString);
      
      setFormData({
        ...article,
        published_date: article.published_date || new Date().toISOString(),
      });
    }
  }, [article, isCreate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSourcesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSourcesInput(value);
    
    // Convert comma-separated string to array
    const sourcesArray = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, sources: sourcesArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isCreate) {
        // Create new article
        const result = await createNewsArticle({
          ...formData,
          imported_date: new Date().toISOString(),
        } as any);
        
        if (!result) {
          throw new Error('Failed to create article');
        }
        
        toast({
          title: "Article created",
          description: "The news article has been created successfully",
        });
      } else if (article) {
        // Update existing article
        const result = await updateNewsArticle(article.id, formData);
        
        if (!result) {
          throw new Error('Failed to update article');
        }
        
        toast({
          title: "Article updated",
          description: "The news article has been updated successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Error",
        description: "Could not save the article",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title (Danish)</Label>
          <Input 
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input 
            id="title_en"
            name="title_en"
            value={formData.title_en || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status || 'draft'}
            onValueChange={(value) => handleSelectChange(value, 'status')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image"
          name="image"
          value={formData.image || ''}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea 
          id="summary"
          name="summary"
          value={formData.summary || ''}
          onChange={handleChange}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary_txt">Summary Text</Label>
        <Textarea 
          id="summary_txt"
          name="summary_txt"
          value={formData.summary_txt || ''}
          onChange={handleChange}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="html">HTML Content</Label>
        <Textarea 
          id="html"
          name="html"
          value={formData.html || ''}
          onChange={handleChange}
          rows={6}
          placeholder="<p>Article content here</p>"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sources">Sources (comma separated)</Label>
        <Input 
          id="sources"
          value={sourcesInput}
          onChange={handleSourcesChange}
          placeholder="DR, TV2, Politiken"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="published_date">Publication Date</Label>
          <Input 
            id="published_date"
            name="published_date"
            type="datetime-local"
            value={formData.published_date ? new Date(formData.published_date).toISOString().slice(0, 16) : ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setFormData(prev => ({
                  ...prev,
                  published_date: new Date(value).toISOString()
                }));
              }
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rate">Rating (0-5)</Label>
          <Input 
            id="rate"
            name="rate"
            type="number"
            min="0"
            max="5"
            value={formData.rate || 0}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active || false}
          onCheckedChange={(checked) => handleSwitchChange(checked, 'active')}
        />
        <Label htmlFor="active">Article Active</Label>
      </div>
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isCreate ? 'Create Article' : 'Update Article'}
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
