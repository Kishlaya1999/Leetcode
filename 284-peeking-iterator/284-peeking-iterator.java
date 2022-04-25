// Java Iterator interface reference:
// https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html

class PeekingIterator implements Iterator<Integer> {
    
    // Declaring the iterator and 
    Iterator<Integer> iter = null;
    // a next object of integer type
    Integer next = null;
    
	public PeekingIterator(Iterator<Integer> iterator) {
	    // initialize any member here.
        
        // initiallizing the iterator
	    iter = iterator;
        // initializing the next if next exist
        if(iter.hasNext()){
            next = iter.next();
        }
	}
	
    // Returns the next element in the iteration without advancing the iterator.
	public Integer peek() {
        return next;
	}
	
	// hasNext() and next() should behave the same as in the Iterator interface.
	// Override them if needed.
	@Override
	public Integer next() {
        // Assigning the current variable to ans for returning it
	    int ans = next;
        
        // Moving the next variable if next exist else assiging it as null
        if(iter.hasNext()){
            next = iter.next();
        }else{
            next = null;
        }
        
        // Returning the variable which was assigned earlier
        return ans;
	}
	
	@Override
	public boolean hasNext() {
        
        // If current and next variable exist then returning true else false 
	    return next != null || iter.hasNext();
	}
}