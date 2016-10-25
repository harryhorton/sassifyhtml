# sassifyhtml
Converts HTML to SCSS

## Purpose
I found myself writing a lot of html, and then having to replicate much
of the structure in SCSS. As your run of the mill lazy developer, I got
tired of having to do this over and over again. Solution?  I automated it.

This isn't a perfect solution, as writing styling is a highly opinionated 
venture.  This does, however, take a lot of the work out of the process. 
Drop in an entire body block of HTML, or just the component you're working 
with.  

## Usage
Simply drop your html into the left pannel, and click convert.  SassifyHTML will
Conver the provided html structure to heirarchical SCSS.

## Options
There are a list of options for tags, IDs, and classes, but the options boil
 down to a few simple concepts.

   * Hide will hide tags, ids, or classes from the output, while leaving other
   portions of the selector in place(if they exist).  Toggle on or off to hide
    all selectors of this type by default.
   
   * Always hide will always hide the targets, whether or not hide all is checked.

   * Never hide will never hide the targets, whether or not hide all is checked.

   * Remove will delete the target, it's selector, and it's children from the 
   heirarchy.  This is useful for components, or areas that are already styled.

   * Extract will remove the target, it's selectors, and it's children from the 
   heirarchy and insert them again at the top level of the heirarchy.  This is 
   Useful for components to be taken out of the normal flow.

   * Reduce siblings will find all identical siblings of an element and reduce 
   them to a single selector.  Who want's a bunch of .list-items in a row?

   * Combine parents works up the heirarchy looking for parents with identical 
   selectors and combining their children under the same selector.

   * Convert BEM.  If you work with BEM this will identify the BEM double __ 
   heirarchy structure.  It will leave the parent as a normal selector without 
   __ and will output children down the chain with &__[childname].  I do not 
   currently have any functionality for --modifiers.  If you're interested drop 
   me an issue :)

## Project Status

Version 1.0.0

### Roadmap:

* Include BEM modifiers in BEM conversion
* Partially restructure the conversion class for ease of extendabilty
* Add local browser storage to save and retrieve settings
* Make the options interface more usable
* Spiff up the styling
* Break the conversion engine off to begin working on IDE build tools


Please send me feedback, issues, and any suggestions in GitHub issues.

If you're a dev checking out my code, No judging.  We all write code we're not 
proud of.



