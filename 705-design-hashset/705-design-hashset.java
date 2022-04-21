class MyHashSet {

    List<Integer> set;
    
    public MyHashSet() {
        set = new ArrayList();
    }
    
    // Time Complexity : O(n)
    // Space Complexity : O(n)
    public void add(int key) {
        
        for(int i : set){
            if(i == key){
                return;
            }
        }
        set.add(key);
        
    }
    
    // Time Complexity : O(n)
    // Space Complexity : O(n)
    public void remove(int key) {
        
        for(int i = 0; i < set.size(); i++){
            if(set.get(i) == key){
                set.remove(i);
            }
        }
        return;
    }
    
    // Time Complexity : O(n)
    // Space Complexity : O(n)
    public boolean contains(int key) {
        
        for(int i : set){
            if(i == key){
                return true;
            }
        }
        return false;
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * MyHashSet obj = new MyHashSet();
 * obj.add(key);
 * obj.remove(key);
 * boolean param_3 = obj.contains(key);
 */