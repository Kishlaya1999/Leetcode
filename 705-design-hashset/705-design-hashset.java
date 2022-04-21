class MyHashSet {

    int set[];
    
    public MyHashSet() {
        set = new int[1000000+1];
    }
    
    // Time Complexity : O(1)
    // Space Complexity : O(1)
    public void add(int key) {
        
        set[key] = 1;
        
    }
    
    // Time Complexity : O(1)
    // Space Complexity : O(1)
    public void remove(int key) {
        
        set[key] = 0;

    }
    
    // Time Complexity : O(1)
    // Space Complexity : O(1)
    public boolean contains(int key) {
        
        return set[key] == 1;
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * MyHashSet obj = new MyHashSet();
 * obj.add(key);
 * obj.remove(key);
 * boolean param_3 = obj.contains(key);
 */