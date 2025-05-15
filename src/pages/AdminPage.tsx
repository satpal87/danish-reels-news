
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { getAllNewsArticles, toggleNewsStatus, deleteNewsArticle, NewsArticle } from "@/services/newsService";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bookmark, Edit, Filter, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsForm from "@/components/NewsForm";
import { Card } from "@/components/ui/card";
import AdminNewsFilter from '@/components/AdminNewsFilter';

const AdminPage = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Simple admin check (would be replaced with proper auth)
    const isAdmin = localStorage.getItem('isAdmin');
    
    // Automatically set admin access for demo purposes
    if (!isAdmin) {
      localStorage.setItem('isAdmin', 'true');
    }
    
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getAllNewsArticles();
      console.log('Admin page - fetched articles:', data);
      setNewsArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Could not load news articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      // Call the API to toggle status
      const success = await toggleNewsStatus(id, !currentStatus);
      
      if (success) {
        // Update local state only if API call was successful
        setNewsArticles(articles => articles.map(article => 
          article.id === id ? { ...article, active: !currentStatus } : article
        ));
        
        setFilteredArticles(articles => articles.map(article => 
          article.id === id ? { ...article, active: !currentStatus } : article
        ));
        
        toast({
          title: "Status updated",
          description: `Article ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error('Error toggling article status:', error);
      toast({
        title: "Error",
        description: "Could not update article status",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }
    
    try {
      // Call the API to delete the article
      const success = await deleteNewsArticle(id);
      
      if (success) {
        // Update local state only if API call was successful
        setNewsArticles(articles => articles.filter(article => article.id !== id));
        setFilteredArticles(articles => articles.filter(article => article.id !== id));
        
        toast({
          title: "Article deleted",
          description: "The article has been deleted successfully",
        });
      } else {
        throw new Error("Failed to delete article");
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Error",
        description: "Could not delete the article",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setCreateMode(false);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setCreateMode(true);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    fetchArticles(); // Refresh the list after edit/create
  };

  const handleFilterChange = (filters: any) => {
    let result = [...newsArticles];
    
    // Filter by title
    if (filters.title) {
      result = result.filter(article => 
        article.title?.toLowerCase().includes(filters.title.toLowerCase()) || 
        article.title_en?.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    
    // Filter by category
    if (filters.category) {
      result = result.filter(article => 
        article.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(article => article.status === filters.status);
    }
    
    // Filter by active state
    if (filters.active !== '') {
      const isActive = filters.active === 'true';
      result = result.filter(article => article.active === isActive);
    }
    
    setFilteredArticles(result);
  };

  // For demonstration purposes, make admin access always available
  const enableAdminAccess = () => {
    localStorage.setItem('isAdmin', 'true');
    toast({
      title: "Admin access enabled",
      description: "You now have admin access to manage news articles",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-20 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Admin Panel</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" /> 
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button onClick={handleCreate}>Create New Article</Button>
        </div>
      </div>
      
      {showFilters && (
        <AdminNewsFilter onFilterChange={handleFilterChange} />
      )}
      
      <Card className="bg-card rounded-lg shadow p-4 mb-6">
        <ScrollArea className="h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No articles found</TableCell>
                </TableRow>
              ) : (
                filteredArticles.map(article => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      {article.category && (
                        <Badge variant="outline">{article.category}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {article.published_date ? new Date(article.published_date).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={article.active}
                        onCheckedChange={() => handleStatusToggle(article.id, article.active)}
                      />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{createMode ? 'Create New Article' : 'Edit Article'}</DialogTitle>
            <DialogDescription>
              {createMode ? 'Add a new news article' : 'Make changes to the existing article'}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="p-1 pb-16">
              <NewsForm 
                article={editingArticle} 
                onSuccess={handleFormSuccess} 
                isCreate={createMode}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Admin access button for demo purposes - always visible */}
      <div className="fixed bottom-20 right-4">
        <Button onClick={enableAdminAccess} variant="secondary" size="sm">
          <Bookmark className="h-4 w-4 mr-1" /> Enable Admin (Demo)
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
